<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json");

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=movies_db;charset=utf8", "root", "");
        $stmt = $pdo->query("SELECT * FROM movies;");
        $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($movies);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
?>
