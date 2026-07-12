<?php

header("Content-Type: application/json");
include "db.php";

$email = $_POST['email'] ?? '';
$codigo = $_POST['codigo'] ?? '';

if (empty($email) || empty($codigo)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

// Validar que el código exista y no esté vencido
$sql = "SELECT * FROM usuarios 
        WHERE email = ? 
        AND codigo_recuperacion = ? 
        AND codigo_expira > NOW()";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $codigo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "ok", "message" => "Código válido"]);
} else {
    echo json_encode(["status" => "error", "message" => "Código incorrecto o vencido"]);
}
