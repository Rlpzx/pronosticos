<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $user_type = $conn->real_escape_string($_POST['user_type']);

    $sql = "INSERT INTO users (name, email, password, user_type) VALUES ('$name', '$email', '$password', '$user_type')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente"]);
    } else {
        echo json_encode([
            "success" => false, 
            "message" => "Error: " . $conn->error,
            "sql" => $sql,
            "post_data" => $_POST
        ]);
    }
}

$conn->close();
?>
