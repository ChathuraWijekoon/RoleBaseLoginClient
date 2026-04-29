"use client";

import { useState } from "react";
import { loginUser } from "../lib/api";
import { LoginInput, TokenResponse } from "../lib/types";

export default function LoginForm() {
  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [result, setResult] = useState<TokenResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUser(form);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }

    setResult(data);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button type="submit">Login</button>
      </form>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}