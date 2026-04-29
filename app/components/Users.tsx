"use client";

import { useState } from "react";
import { getUsers, updateUser, deleteUser } from "../lib/api";
import { User } from "../lib/types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token") || ""
    : "";

  const fetchUsers = async () => {
    const data = await getUsers(token);
    setUsers(data);
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({ name: user.name, email: user.email });
  };

  const saveEdit = async (id: number) => {
    await updateUser(id, editData, token);
    setEditingId(null);
    fetchUsers();
  };

  const removeUser = async (id: number) => {
    await deleteUser(id, token);
    fetchUsers();
  };

  return (
    <div>
      <h3>Users</h3>
      <button onClick={fetchUsers}>Load Users</button>

      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          
          {editingId === user.id ? (
            <>
              <input
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <input
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
              <button onClick={() => saveEdit(user.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><b>{user.name}</b></p>
              <p>{user.email}</p>

              <button onClick={() => startEdit(user)}>Edit</button>
              <button onClick={() => removeUser(user.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}