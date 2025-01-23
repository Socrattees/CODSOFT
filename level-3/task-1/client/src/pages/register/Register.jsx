import React, { useEffect } from "react";
import { useState } from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState(""); // New state for suburb
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle register logic here
    console.log("Username:", username);
    console.log("First Name:", firstName);
    console.log("Surname:", surname);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Street Address:", streetAddress);
    console.log("Suburb:", suburb); // Log suburb
    console.log("City:", city);
    console.log("State/Province:", state);
    console.log("Postal Code:", postalCode);
    console.log("Country:", country);
  };

  // useEffect to add background to body of this page
  useEffect(() => {
    document.body.classList.add("register-background");

    // Cleanup function to remove background
    return () => {
      document.body.classList.remove("register-background");
    }
  }, []);

  return (
    <div className="register">
      <Navbar />
      <h1>Register</h1>
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="retypePassword">Retype Password:</label>
            <input
              type="password"
              id="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="streetAddress">Street Address:</label>
            <input
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="suburb">Suburb:</label>
            <input
              type="text"
              id="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="state">State/Province:</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;