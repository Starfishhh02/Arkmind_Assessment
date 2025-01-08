<?php
header("Access-Control-Allow-Origin: *");  // Allows requests from any origin
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");  // Allows specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allows specific headers
header("Content-Type: application/json");  // Ensure response is in JSON format

$server_name = "localhost";
$db_name = "arkmind_assessment";
$user_name = "root";
$password = ""; 

// Create a connection
$conn = new mysqli($server_name, $user_name, $password, $db_name);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

//Modify table to include id, name, description, price
$sql = "CREATE TABLE IF NOT EXISTS items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if($conn->query($sql) !== TRUE){
    echo json_encode(["success" => false, "message" => "Error creating table: " . $conn->error])
    ;
}


// Function to delete an item by ID
function deleteItem($id, $conn) {
    // Escape the ID to prevent SQL injection
    $id = $conn->real_escape_string($id);

    // SQL query to delete an item
    $sql = "DELETE FROM items WHERE id = '$id'";

    // Execute the query and check if successful
    if ($conn->query($sql) === TRUE) {
        return ["success" => true, "message" => "Item deleted successfully"];
    } else {
        return ["success" => false, "message" => "Error: " . $conn->error];
    }
}

// CREATE: Insert new item (POST request)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the data from the POST request
    $inputData = json_decode(file_get_contents("php://input"), true); // Parse JSON body

    // Ensure all required fields are provided
    if (isset($inputData['name']) && isset($inputData['description']) && isset($inputData['price'])) {
        $name = $conn->real_escape_string($inputData['name']);
        $description = $conn->real_escape_string($inputData['description']);
        $price = $conn->real_escape_string($inputData['price']);

        // Insert query
        $sql = "INSERT INTO items (name, description, price) VALUES ('$name', '$description', '$price')";
        if ($conn->query($sql) === TRUE) {
            // Success message
            echo json_encode(["success" => true, "message" => "New item created successfully"]);
        } else {
            // Error message
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }
    } else {
        // Missing fields in the request
        echo json_encode(["success" => false, "message" => "Missing required fields: name, description, or price"]);
    }
}

// READ: Fetch all items (GET request)
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // SQL query to fetch all data from the items table
    $sql = "SELECT * FROM items";
    $result = $conn->query($sql);

    // Check if query was successful
    if ($result->num_rows > 0) {
        // Store the fetched data into an array
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }

        // Output the data as JSON
        echo json_encode(["success" => true, "items" => $items]);
    } else {
        // If no data found
        echo json_encode(["success" => false, "message" => "No items found"]);
    }
}

// UPDATE: Update an existing item (PUT request)
else if  ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $inputData = json_decode(file_get_contents("php://input"), true); // Parse JSON body

    // Check if the action is 'update'
    if (isset($inputData['action']) && $inputData['action'] == 'update') {
        // Ensure all required fields are provided
        if (isset($inputData['id']) && isset($inputData['name']) && isset($inputData['description']) && isset($inputData['price'])) {
            $id = $conn->real_escape_string($inputData['id']); // Sanitize ID
            $name = $conn->real_escape_string($inputData['name']);
            $description = $conn->real_escape_string($inputData['description']);
            $price = $conn->real_escape_string($inputData['price']);

            // Update query: Ensure you're updating the correct item by id
            $sql = "UPDATE items SET name='$name', description='$description', price='$price' WHERE id='$id'";

            if ($conn->query($sql) === TRUE) {
                // Success response
                echo json_encode(["success" => true, "message" => "Item updated successfully"]);
            } else {
                // Error response
                echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
            }
        } else {
            // Missing fields in the request
            echo json_encode(["success" => false, "message" => "Missing required fields"]);
        }
    }
}
// DELETE: Delete an item (DELETE request)
else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Get the data from the DELETE request
    $inputData = json_decode(file_get_contents("php://input"), true); // Parse JSON body

    // Ensure item ID is provided
    if (isset($inputData['id'])) {
        $id = $conn->real_escape_string($inputData['id']);

        // Delete query
        $sql = "DELETE FROM items WHERE id='$id'";
        if ($conn->query($sql) === TRUE) {
            // Success message
            echo json_encode(["success" => true, "message" => "Item deleted successfully"]);
        } else {
            // Error message
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }
    } else {
        // Missing ID in the request
        echo json_encode(["success" => false, "message" => "Missing required field: id"]);
    }
}


// Close the connection
$conn->close();
?>
