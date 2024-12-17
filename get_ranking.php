<?php
require_once 'config.php';

$sql = "SELECT name, score FROM users ORDER BY score DESC LIMIT 5";
$result = $conn->query($sql);

$ranking = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ranking[] = $row;
    }
}

echo json_encode($ranking);

$conn->close();
?>
