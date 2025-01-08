<?php
// Database connection
$servername = "localhost";
$username = "root";  // Default username for XAMPP MySQL
$password = "";  // Default password for XAMPP MySQL
$dbname = "arkmind_assessment";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch items from the "items" table
$sql = "SELECT id, name, description, price FROM items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the data for each item
    $items = [];
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode($items);  // Output the items as JSON
} else {
    echo json_encode([]);  // No items found
}

$conn->close();
?>
