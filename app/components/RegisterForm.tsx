/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { registerUser } from "../lib/api";
import { RegisterInput } from "../lib/types";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
  });

  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await registerUser(form);
    setResult(data);
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button type="submit">Register</button>
      </form>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}