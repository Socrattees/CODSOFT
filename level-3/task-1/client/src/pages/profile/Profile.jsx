import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./profile.css";
import Navbar from "../../components/navbar/Navbar";
import { getUserByIdCall, updateUserDetailsCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user, dispatch } = useContext(UserContext);
  const [canEdit, setCanEdit] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth.slice(0, 10));
  const [streetAddress, setStreetAddress] = useState(user.address.streetAddress);
  const [suburb, setSuburb] = useState(user.address.suburb);
  const [city, setCity] = useState(user.address.city);
  const [state, setState] = useState(user.address.province);
  const [postalCode, setPostalCode] = useState(user.address.postalCode);
  const [country, setCountry] = useState(user.address.country);
  
// Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        username,
        firstName,
        surname,
        email,
        address: {
          streetAddress,
          suburb,
          city,
          province: state,
          postalCode,
          country,
        },
      };
      await updateUserDetailsCall(user._id, updatedUser);
      const fetchedUser = await getUserByIdCall(user._id);
      dispatch({ type: "UPDATE_USER", payload: fetchedUser });
      setCanEdit(false);
    } catch (err) {
      console.error("Error updating user details: ", err);
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

  // useEfect to reset the form fields when canEdit is false
  useEffect(() => {
    if (!canEdit) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setSurname(user.surname);
      setEmail(user.email);
      setStreetAddress(user.address.streetAddress);
      setSuburb(user.address.suburb);
      setCity(user.address.city);
      setState(user.address.province);
      setPostalCode(user.address.postalCode);
      setCountry(user.address.country);
    }
  }, [canEdit, user]);

  return (
    <div className="register">
      <Navbar />
      <h1>Profile</h1>
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              disabled={true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
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
              disabled={canEdit ? false : true}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="profile-buttons">
            <button type="button" onClick={() => setCanEdit(!canEdit)}>
              {canEdit ? "Cancel" : "Edit"}
            </button>
            {canEdit && <button type="submit" className="save">Save</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;