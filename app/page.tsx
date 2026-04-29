import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>FastAPI Auth UI</h1>

      <RegisterForm />
      <hr />
      <LoginForm />
      <hr />
      <Users />
    </main>
  );
}