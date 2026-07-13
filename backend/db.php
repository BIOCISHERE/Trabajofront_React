<?php

$host = "localhost";
$user = "root";     // usuario por defecto en MAMP
$pass = "root";     // contraseña por defecto en MAMP
$dbname = "pnks"; // nombre de tu base en phpMyAdmin

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
