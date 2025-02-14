import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { findAdminCall } from "../../apiCalls";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [adminExits, setAdminExists] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // As page is only for admin registration, we are not checking for admin role
    if (adminExits) {
      setError("Admin already exists");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  // useEffect to check if admin exists
  useEffect(() => {
    const findAdmin = async () => {
      try {
        const admin = await findAdminCall();
        setAdminExists(admin);
      } catch (err) {
        console.error("Error while finding admin:", err);
      }
    };
    findAdmin();
  }, []);

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-header wrapper">
          <h1>Welcome</h1>
          <h1>to</h1>
          <h1>Manage Mate!</h1>
        </div>
        <div className="register-form-wrapper">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;