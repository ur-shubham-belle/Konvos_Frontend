import React, { useState } from "react";
import { useAuth } from "../context/authContext.js";

const BACKEND_URL = "YOUR_BACKEND_URL_HERE"; // Use your actual backend URL

const LoginForm = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth() || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    if (!login) {
      setMessage("Error: Auth service not ready.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        login({ id: data.userId, username: data.username }, data.token);
      } else {
        setMessage(`Error: ${data.msg || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error occurred.");
    }
  };

  return (
    <div>
      <h2>Login Test</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {message && (
        <p style={{ color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
      <p>
        Don't have an account?{" "}
        <button onClick={toggleView}>Register here</button>
      </p>
    </div>
  );
};

export default LoginForm;
