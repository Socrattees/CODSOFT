import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

    // useEffect to add background to body of this page
    useEffect(() => {
      document.body.classList.add('login-background');
  
      // Cleanup function to remove background
      return () => {
        document.body.classList.remove('login-background');
      }
    }, []);

  return (
    <div className="login">
      <Navbar />
      <h1>Login</h1>
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-group">
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
          <p className="login-form-register">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;