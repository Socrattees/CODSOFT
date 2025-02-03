import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { loginCall } from "../../apiCalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const loginCredentials = await loginCall({ email, password });
      if (loginCredentials) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.error("Error while logging in:", err);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header wrapper">
          <h1>Welcome</h1>
          <h1>to</h1>
          <h1>Manage Mate!</h1>
        </div>
        <div className="login-form-wrapper">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;