import React from "react";
import "./Toolbar.css";

export default function Toolbar({ onAdd, onEdit, onDelete, isEditing }) {
  return (
    <div className="toolbar">
      <button className="btn" onClick={onAdd}>
        ➕ Thêm
      </button>
      <button
        className="btn"
        onClick={onEdit}
        disabled={!isEditing}
        title={isEditing ? "" : "Chọn 1 mục để sửa"}
      >
        ✏️ Sửa
      </button>
      <button
        className="btn"
        onClick={onDelete}
        disabled={!isEditing}
        title={isEditing ? "" : "Chọn 1 mục để xóa"}
      >
        🗑️ Xóa
      </button>
    </div>
  );
}
