// const API_BASE = "http://127.0.0.1:8000/api/v1";

// export async function registerUser(data: any) {
//   const res = await fetch(`${API_BASE}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export async function loginUser(data: any) {
//   const res = await fetch(`${API_BASE}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export async function getUsers(token: string) {
//   const res = await fetch(`${API_BASE}/users`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }

// export async function updateUser(id: number, data: any, token: string) {
//   const res = await fetch(`${API_BASE}/users/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// export async function deleteUser(id: number, token: string) {
//   return fetch(`${API_BASE}/users/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

import api from "./axios";
import { RegisterInput, LoginInput, User, UserUpdateInput } from "./types";

// Register
export const registerUser = async (data: RegisterInput) => {
  const res = await api.post("/register", data);
  return res.data;
};

// Login
export const loginUser = async (data: LoginInput) => {
  const res = await api.post("/login", data);
  return res.data;
};

// Get users
export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

// Update user
export const updateUser = async (
  id: number,
  data: UserUpdateInput
): Promise<User> => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

// Delete user
export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};