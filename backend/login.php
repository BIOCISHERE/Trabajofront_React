<?php

require "cors.php";
include "db.php";

$email = trim($_POST['email'] ?? '');
$clave = $_POST['clave'] ?? '';

if (empty($email) || empty($clave)) {
    echo json_encode(["status" => "error", "message" => "Debes ingresar correo y contraseña"]);
    exit;
}

$sql = "SELECT id, tipo_usuario, nombre_completo, email, clave, estado_cuenta 
        FROM usuarios 
        WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {

    echo json_encode(["status" => "error", "message" => "Correo o contraseña incorrectos"]);
    exit;
}

$usuario = $result->fetch_assoc();

if (!password_verify($clave, $usuario['clave'])) {
    echo json_encode(["status" => "error", "message" => "Correo o contraseña incorrectos"]);
    exit;
}

if ($usuario['estado_cuenta'] !== 'Activo') {
    echo json_encode(["status" => "error", "message" => "Tu cuenta aún no está activa. Contacta al administrador."]);
    exit;
}


echo json_encode([
    "status" => "ok",
    "message" => "Inicio de sesión exitoso",
    "usuario" => [
        "id" => $usuario['id'],
        "nombre_completo" => $usuario['nombre_completo'],
        "email" => $usuario['email'],
        "tipo_usuario" => $usuario['tipo_usuario'],
    ]
]);

$stmt->close();