<?php

require "cors.php";
include "db.php";

$email = trim($_POST['email'] ?? '');
$codigo = trim($_POST['codigo'] ?? '');
$nuevaClave = $_POST['nuevaClave'] ?? '';

if (empty($email) || empty($codigo) || empty($nuevaClave)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Email inválido"]);
    exit;
}

if (strlen($nuevaClave) < 6) {
    echo json_encode(["status" => "error", "message" => "La contraseña debe tener al menos 6 caracteres"]);
    exit;
}

$sql = "SELECT id FROM usuarios WHERE email = ? AND codigo_recuperacion = ? AND codigo_expira > NOW()";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    exit;
}

$stmt->bind_param("ss", $email, $codigo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Código incorrecto o vencido"]);
    exit;
}

$hash = password_hash($nuevaClave, PASSWORD_BCRYPT);

$update = $conn->prepare("UPDATE usuarios SET clave = ?, codigo_recuperacion = NULL, codigo_expira = NULL WHERE email = ?");
if (!$update) {
    echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    exit;
}

$update->bind_param("ss", $hash, $email);

if ($update->execute()) {
    echo json_encode(["status" => "ok", "message" => "Contraseña actualizada"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al actualizar"]);
}

$stmt->close();
$update->close();
