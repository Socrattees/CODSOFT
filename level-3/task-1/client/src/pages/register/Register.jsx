import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";
import { registerCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return;
    }
    // Create object with user details to send to server
    const newUserDetails = {
      username,
      firstName,
      surname,
      email,
      password,
      dateOfBirth,
      streetAddress,
      suburb,
      city,
      province: state,
      postalCode,
      country
    }
    try {
      registerCall(newUserDetails, dispatch);
      navigate("/");
    } catch (err) {
      console.error("Error registering new user: ", err);
    }
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
              aria-required="true"
              aria-label="Username"
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
              aria-required="true"
              aria-label="First Name"
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
              aria-required="true"
              aria-label="Surname"
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
              aria-required="true"
              aria-label="Email"
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
              aria-required="true"
              aria-label="Password"
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
              aria-required="true"
              aria-label="Retype Password"
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
              aria-required="true"
              aria-label="Date of Birth"
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
              aria-required="true"
              aria-label="Street Address"
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
              aria-required="true"
              aria-label="Suburb"
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
              aria-required="true"
              aria-label="City"
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
              aria-required="true"
              aria-label="State/Province"
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
              aria-required="true"
              aria-label="Postal Code"
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
              aria-required="true"
              aria-label="Country"
            />
          </div>
          <button type="submit" aria-label="Register button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;