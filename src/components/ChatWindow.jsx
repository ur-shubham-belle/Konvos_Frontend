import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/authContext";

const BACKEND_URL = "https://konvos-backend.onrender.com";

// Initialize socket connection
const socket = io(BACKEND_URL);

const ChatWindow = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle WebSocket events and fetch history
  useEffect(() => {
    // Fetch historical messages on load
    const fetchMessages = async () => {
      const res = await fetch(`${BACKEND_URL}/api/messages`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();

    // Listen for new messages from the server
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && user) {
      // Emit message to server with user details
      socket.emit("sendMessage", {
        userId: user.id,
        username: user.username,
        content: input,
      });
      setInput("");
    }
  };

  return (
    <div
      className="chat-container"
      style={{ height: "400px", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Welcome, {user?.username || "Guest"}!</span>
        <button onClick={logout}>Logout</button>
      </div>
      <div
        className="message-list"
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {/* Messages from history have msg.sender.username, live messages have msg.username */}
            <strong>{msg.sender?.username || msg.username}:</strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ padding: "10px", display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
