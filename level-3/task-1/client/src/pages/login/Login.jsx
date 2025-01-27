import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import { loginCall } from "../../apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginCall({ username, password }, dispatch);
      navigate("/");
    } catch (err) {
      console.error("Error logging in: ", err);
    }
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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