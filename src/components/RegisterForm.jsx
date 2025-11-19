import React, { useState } from "react";

// Make sure you replace YOUR_REPLIT_URL with the actual URL of your backend project
const BACKEND_URL = "https://konvos-backend.onrender.com";

const RegisterForm = ({ toggleView }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
        // toggleView(); // Optionally toggle to login view automatically
      } else {
        setMessage(`Error: ${data.msg || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error occurred. Is the backend server running?");
    }
  };

  return (
    <div>
      <h2>Register for Konvos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && (
        <p style={{ color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
      <p>
        Already have an account?{" "}
        <button onClick={toggleView}>Login here</button>
      </p>
    </div>
  );
};

export default RegisterForm;
