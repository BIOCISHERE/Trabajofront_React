<?php

require "cors.php";
include "db.php";
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Función para generar un código seguro
function generarCodigo($longitud = 10)
{
    $mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $minus = "abcdefghijklmnopqrstuvwxyz";
    $nums  = "0123456789";
    $especiales = "!@#$%^&*()-_=+<>?";

    $todos = $mayus . $minus . $nums . $especiales;

    $codigo = "";
    // Garantizar al menos un carácter de cada tipo
    $codigo .= $mayus[random_int(0, strlen($mayus) - 1)];
    $codigo .= $minus[random_int(0, strlen($minus) - 1)];
    $codigo .= $nums[random_int(0, strlen($nums) - 1)];
    $codigo .= $especiales[random_int(0, strlen($especiales) - 1)];

    // Completar hasta la longitud deseada
    for ($i = 4; $i < $longitud; $i++) {
        $codigo .= $todos[random_int(0, strlen($todos) - 1)];
    }

    // Mezclar los caracteres para que no quede predecible
    return str_shuffle($codigo);
}

$email = $_POST['email'] ?? '';

$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Generar código seguro
    $codigo = generarCodigo(12);

    // Definir tiempo de expiración (ej: 15 minutos desde ahora)
    $expira = date("Y-m-d H:i:s", strtotime("+15 minutes"));

    // Guardar código y expiración en DB
    $update = $conn->prepare("UPDATE usuarios SET codigo_recuperacion = ?, codigo_expira = ? WHERE email = ?");
    $update->bind_param("sss", $codigo, $expira, $email);
    $update->execute();

    // Enviar correo
    $mail = new PHPMailer(true);
    try {
        $mail->isMail(); // usa mail() local
        $mail->setFrom("no-reply@pnks.local", "Recuperar Contraseña");
        $mail->addAddress($email);
        $mail->Subject = "Código de recuperación";
        $mail->Body = "Tu código de recuperación es: $codigo";
        $mail->send();

        echo json_encode(["status" => "ok", "message" => "Código enviado"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Correo no registrado"]);
}