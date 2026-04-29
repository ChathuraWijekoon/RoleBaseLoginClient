import { LoginInput, RegisterInput, User } from "./types";

const API_BBASE = "http://127.0.0.1:8000/api/v1";

export async function registerUser(data: RegisterInput): Promise<User> {
    const res = await fetch(`${API_BBASE}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function LoginUser(data: LoginInput): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BBASE}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function getUsers(token: string): Promise<User[]> {
    const res = await fetch(`${API_BBASE}/users`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res.json();
}

export async function updateUser(id: number, data: Partial<User>, token: string): Promise<User> {
    const res = await fetch(`${API_BBASE}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteUser(id: number, token: string): Promise<void> {
    await fetch(`${API_BBASE}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}