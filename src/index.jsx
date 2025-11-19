import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import "./style.css";

const container = document.getElementById("root"); // Find the 'root' element

// Make sure the container was found before creating the root
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element in index.html");
}
