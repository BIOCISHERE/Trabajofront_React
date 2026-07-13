<?php

require "cors.php";
include "db.php";

function validarRutPHP($rutInput)
{
    $rutLimpio = strtoupper(str_replace([".", "-"], "", trim($rutInput)));
    if (!preg_match('/^[0-9]+[0-9K]$/', $rutLimpio)) return false;

    $cuerpo = substr($rutLimpio, 0, -1);
    $dv = substr($rutLimpio, -1);

    $suma = 0;
    $multiplo = 2;
    for ($i = strlen($cuerpo) - 1; $i >= 0; $i--) {
        $suma += $multiplo * intval($cuerpo[$i]);
        $multiplo = $multiplo < 7 ? $multiplo + 1 : 2;
    }

    $resto = 11 - ($suma % 11);
    if ($resto == 11) $dvEsperado = "0";
    elseif ($resto == 10) $dvEsperado = "K";
    else $dvEsperado = strval($resto);

    return $dvEsperado === $dv;
}

// Datos esperados desde el formulario
$rut = trim($_POST['rut'] ?? '');
$nombre_completo = trim($_POST['nombre_completo'] ?? '');
$fecha_nacimiento = trim($_POST['fecha_nacimiento'] ?? '');
$email = trim($_POST['email'] ?? '');
$clave = $_POST['clave'] ?? '';
$sexo = trim($_POST['sexo'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');

// --- Validaciones server-side (defensa además de las del frontend) ---
if (empty($rut) || empty($nombre_completo) || empty($fecha_nacimiento) || empty($email) || empty($clave) || empty($sexo) || empty($telefono)) {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios"]);
    exit;
}

if (!validarRutPHP($rut)) {
    echo json_encode(["status" => "error", "message" => "El RUT ingresado no es válido"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "El correo electrónico no es válido"]);
    exit;
}

if (strlen($clave) < 6) {
    echo json_encode(["status" => "error", "message" => "La contraseña debe tener al menos 6 caracteres"]);
    exit;
}

if (!in_array($sexo, ["Masculino", "Femenino", "Otro"])) {
    echo json_encode(["status" => "error", "message" => "Selecciona un sexo válido"]);
    exit;
}

$edad = (new DateTime())->diff(new DateTime($fecha_nacimiento))->y;
if ($edad < 18) {
    echo json_encode(["status" => "error", "message" => "Debes ser mayor de 18 años para registrarte"]);
    exit;
}

// --- Verificar que no exista ya el RUT o el correo ---
$check = $conn->prepare("SELECT id FROM usuarios WHERE rut = ? OR email = ?");
$check->bind_param("ss", $rut, $email);
$check->execute();
$checkResult = $check->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Ya existe una cuenta registrada con ese RUT o correo"]);
    exit;
}
$check->close();

// --- Insertar el nuevo propietario ---
$hash = password_hash($clave, PASSWORD_BCRYPT);
$telefonoCompleto = "+56" . preg_replace('/\s+/', '', $telefono);
$tipo_usuario = "Propietario";
$estado_cuenta = "Activo"; // el propietario queda activo de inmediato

$sql = "INSERT INTO usuarios (tipo_usuario, rut, nombre_completo, email, clave, telefono, sexo, fecha_nacimiento, estado_cuenta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    exit;
}

$stmt->bind_param(
    "sssssssss",
    $tipo_usuario,
    $rut,
    $nombre_completo,
    $email,
    $hash,
    $telefonoCompleto,
    $sexo,
    $fecha_nacimiento,
    $estado_cuenta
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "message" => "Cuenta creada correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "No se pudo crear la cuenta"]);
}

$stmt->close();