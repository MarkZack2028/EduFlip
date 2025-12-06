<?php
// Sesuaikan dengan docker-compose kamu
$DB_HOST = 'db';        // ganti jadi nama service MySQL di docker-compose (misal: db, mysql, dll)
$DB_NAME = 'eduflipdb';
$DB_USER = 'eduflip';
$DB_PASS = 'eduflip2025'; // GANTI dengan password root MySQL-mu

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die('Koneksi database gagal: ' . $e->getMessage());
}
