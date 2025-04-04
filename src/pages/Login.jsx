/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.BACKEND_URL;



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "student") navigate("/student-dashboard");
      else navigate("/institution-dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button onClick={() => navigate("/register")} style={{ marginTop: "10px" }}>
        Register
      </button>
      </form>
    </div>
  );
}

export default Login;
