import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ name: "", address: "" });
  const [editingId, setEditingId] = useState(null);

  // READ
  const fetchUsers = () => {
    fetch("https://68218b01259dad2655af8884.mockapi.io/api/v1/lesson1/lesson01")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch users failed:", err));
  };

  useEffect(fetchUsers, []);

  // CREATE & UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://68218b01259dad2655af8884.mockapi.io/api/v1/lesson1/lesson01/${editingId}`
      : "https://68218b01259dad2655af8884.mockapi.io/api/v1/lesson1/lesson01";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => {
        setForm({ name: "", address: "" });
        setEditingId(null);
        setSelectedId(null);
        fetchUsers();           
      })
      .catch((err) => console.error("Save user failed:", err));
  };

  //  DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Chắc chắn xóa user này chứ?")) return;
    fetch(
      `https://68218b01259dad2655af8884.mockapi.io/api/v1/lesson1/lesson01/${id}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        fetchUsers();           
        setSelectedId(null);
      })
      .catch((err) => console.error("Delete user failed:", err));
  };

  // Toolbar 
  const handleAddClick = () => {
    setForm({ name: "", address: "" });
    setEditingId(null);
    setSelectedId(null);
  };

  const handleEditClick = () => {
    if (!selectedId) return;
    const user = users.find((u) => u.id === selectedId);
    setForm({ name: user.name, address: user.address });
    setEditingId(user.id);
  };

  const handleDeleteClick = () => {
    if (selectedId) handleDelete(selectedId);
  };

  return (
    <div className="container">
      <h1 className="title">Quản lý người dùng</h1>

      {/* 1. Thanh menu */}
      <Toolbar
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        isEditing={!!selectedId}
      />

      {/* 2. Form Thêm / Sửa */}
      <form className="userForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", address: "" });
              setEditingId(null);
            }}
          >
            Hủy
          </button>
        )}
      </form>

      {/* 3. List và chọn dòng */}
      <ul className="userList">
        {users.map((user) => (
          <li
            key={user.id}
            className={`userItem ${
              user.id === selectedId ? "selected" : ""
            }`}
            onClick={() => setSelectedId(user.id)}
          >
            <span>
              <strong className="userName">{user.name}</strong> –{" "}
              <span className="userAddress">{user.address}</span>
            </span>
          </li>
        ))}
        {users.length === 0 && (
          <li className="loading">Không có dữ liệu</li>
        )}
      </ul>
    </div>
  );
}

export default App;
