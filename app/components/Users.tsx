"use client";

import { useState } from "react";
import { getUsers, updateUser, deleteUser } from "../lib/api";
import { User, UserUpdateInput } from "../lib/types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<UserUpdateInput>({});
  const [currentUserRole, setCurrentUserRole] = useState<string>("user");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔍 Decode JWT (basic version)
  const getUserRoleFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "user";

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role || "user";
    } catch {
      return "user";
    }
  };

  // 📥 Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);

      const role = getUserRoleFromToken();
      setCurrentUserRole(role);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Start editing
  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // 💾 Save update
  const saveEdit = async (id: number) => {
    try {
      const payload: UserUpdateInput = { ...editData };

      // 🚫 Prevent empty password overwrite
      if (!payload.password) {
        delete payload.password;
      }

      // 🚫 Prevent non-admin role update
      if (currentUserRole !== "admin") {
        delete payload.role;
      }

      await updateUser(id, payload);

      setEditingId(null);
      setEditData({});
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // 🗑 Delete user
  const removeUser = async (id: number) => {
    try {
      const confirmDelete = confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h3>Users</h3>

      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Load Users"}
      </button>

      {users.length === 0 && <p>No users found</p>}

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {editingId === user.id ? (
            <>
              {/* Name */}
              <input
                placeholder="Name"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              {/* Email */}
              <input
                placeholder="Email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />

              {/* Password */}
              <input
                type="password"
                placeholder="New Password (optional)"
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
              />

              {/* Role (admin only) */}
              {currentUserRole === "admin" && (
                <select
                  value={editData.role || "user"}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              )}

              <br />

              <button onClick={() => saveEdit(user.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>
                <strong>{user.name}</strong>
              </p>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>

              <button onClick={() => startEdit(user)}>Edit</button>
              <button onClick={() => removeUser(user.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}