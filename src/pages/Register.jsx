import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.BACKEND_URL;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();




  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data?.msg || "Bad Request");
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="institution">Institution</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={() => navigate("/login")} style={{ marginTop: "10px" }}>
        Login
      </button>
      </p>
    </div>
  );
}

export default Register;
