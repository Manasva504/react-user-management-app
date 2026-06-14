import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  function editUser(user) {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  }
  function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function addUser() {
    if (name.trim() === "" || email.trim() === "") {
      return;
    }

    if (editingId !== null) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === editingId
          ? {
              ...user,
              name: name,
              email: email,
            }
          : user,
      );

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setEditingId(null);
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: "Not Provided",
        website: "Not Provided",
      };

      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setName("");
    setEmail("");
  }
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="container">
      <div>
        <h1>User-Management-App</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={addUser}>
            {editingId !== null ? "Update User" : "Add User"}
          </button>

          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="users-grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="user-card" key={user.id}>
                <h3>{user.name}</h3>

                <p>Email: {user.email}</p>

                <p>Phone: {user.phone}</p>

                <p>Website: {user.website}</p>

                <button onClick={() => deleteUser(user.id)}>Delete</button>

                <button onClick={() => editUser(user)}>Edit</button>
              </div>
            ))
          ) : (
            <p>No users match your search.</p>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>Designed and Developed by Manasva | React User Management App</p>
      </footer>
    </div>
  );
}

export default App;
