import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Control the visibility of the add form
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Control the visibility of the edit form

  // Fetch all items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/userdata/config.php"
      );
      const fetchedItems = Array.isArray(response.data.items)
        ? response.data.items
        : [];
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add a new item
  const addItem = async () => {
    try {
      await axios.post("http://localhost:8080/userdata/config.php", {
        action: "create",
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
      });
      fetchItems();
      resetForm();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Edit an existing item
  const editItemHandler = (item: Item) => {
    setEditItem(item);
    setNewItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
    });
    setIsEditFormVisible(true); // Show the edit form
  };

  // Update an existing item
  const updateItem = async () => {
    try {
      await axios.put("http://localhost:8080/userdata/config.php", {
        action: "update",
        id: editItem?.id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
      });
      fetchItems();
      resetForm();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const deleteItem = async (id: string) => {
    try {
      await axios.delete("http://localhost:8080/userdata/config.php", {
        data: { id },
      });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Reset the form after add/update
  const resetForm = () => {
    setNewItem({ id: "", name: "", description: "", price: 0 });
    setEditItem(null);
    setIsFormVisible(false); // Close the add form after submission
    setIsEditFormVisible(false); // Close the edit form after submission
  };

  // Toggle visibility of the add form
  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Item List</h1>
        {/* Items Table */}
        <div>
          <h2>Items</h2>
          <table className="item-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item: Item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => editItemHandler(item)}>
                        Edit
                      </button>
                      <button onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No items available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Item Form */}
        {isEditFormVisible && (
          <div className="edit-item-container">
            <h2>Edit Item</h2>
            <table className="item-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="ID"
                      value={newItem.id}
                      onChange={(e) =>
                        setNewItem({ ...newItem, id: e.target.value })
                      }
                      required
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Price"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        updateItem();
                      }}
                    >
                      Update Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditFormVisible(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Add Item Form */}
        <h2
          onClick={toggleForm}
          style={{ cursor: "pointer", color: "#000000" }}
        >
          {isFormVisible ? "Close Add Item Form" : "Add Item"}
        </h2>

        {isFormVisible && (
          <div className="add-item-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
                required
              />
              <button type="submit">Add Item</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
