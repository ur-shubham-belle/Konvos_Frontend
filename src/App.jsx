import React, { useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { useAuth } from "./context/authContext.js"; // Check this line for the extra = again
import "./style.css";

function App() {
  const { user } = useAuth() || {};
  const [isLoginView, setIsLoginView] = useState(true);

  if (user && user.id) {
    return <ChatWindow />;
  }

  // Ensure this section is exactly as below:
  return (
    <div className="App">
      <header>
        <h1>Welcome to Konvos</h1>
        <p>A simple messaging platform.</p>
      </header>
      <main>
        {isLoginView ? (
          <LoginForm toggleView={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm toggleView={() => setIsLoginView(true)} />
        )}
      </main>
    </div>
  );
}

export default App;
