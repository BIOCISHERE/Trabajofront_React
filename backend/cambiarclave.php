<?php

require "cors.php";
include "db.php";

$email = $_POST['email'] ?? '';
$nuevaClave = $_POST['nuevaClave'] ?? '';

if (empty($email) || empty($nuevaClave)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

$hash = password_hash($nuevaClave, PASSWORD_BCRYPT);

$sql = "UPDATE usuarios 
        SET clave = ?, codigo_recuperacion = NULL, codigo_expira = NULL 
        WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    exit;
}

$stmt->bind_param("ss", $hash, $email);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "message" => "Contraseña actualizada"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al actualizar"]);
}

$stmt->close();