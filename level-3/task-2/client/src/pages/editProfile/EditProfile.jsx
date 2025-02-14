import React, { useContext, useEffect, useState } from "react";
import "./edit-profile.css";
import { useNavigate } from "react-router-dom";
import { checkEmailCall, checkUsernameCall, getUserCall, updateProfileCall, uploadFileCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Navbar from "../../components/navbar/NavBar";

const EditProfile = () => {
  const { user: currentUser, dispatch } = useContext(UserContext);

  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // First check if the user has changed any details
    if (
      username === user.username &&
      firstName === user.firstName &&
      surname === user.surname &&
      email === user.email &&
      password === "" &&
      retypePassword === "" &&
      profilePicture === null
    ) {
      return;
    }

    // Confirm that the user wants to update their profile
    const confirmUpdate = window.confirm("Are you sure you want to update your profile?");
    if (!confirmUpdate) {
      return;
    }

    // Confirm that the user wants to update their password
    if (password !== "" || retypePassword !== "") {
      const confirmPasswordUpdate = window.confirm("Are you sure you want to update your password?");
      if (!confirmPasswordUpdate) {
        return;
      }
    }

    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if the username is unique
    if (username !== user.username) {
      const isUsernameUnique = await checkUsernameCall(username);
      if (!isUsernameUnique) {
        setError("Username is already taken");
        return;
      }
    }

    // Check if the email is unique
    if (email !== user.email) {
      const isEmailUnique = await checkEmailCall(email);
      if (!isEmailUnique) {
        setError("Email is already taken");
        return;
      }
    }

    try {
      const updatedUser = {
        username,
        firstName,
        surname,
        email,
        password,
        profilePicture: currentUser.profilePicture,
      };
      if (password === "") {
        delete updatedUser.password;
      }
      if (profilePicture) {
        const formData = new FormData();
        const fileName = Date.now() + profilePicture.name;
        formData.append("name", fileName);
        formData.append("file", profilePicture);
        updatedUser.profilePicture = fileName;
        await uploadFileCall(formData);
      }
      await updateProfileCall(user._id, updatedUser);
      const res = await getUserCall(currentUser._id);
      try {
        dispatch({ type: "UPDATE_START" });
        dispatch({ type: "UPDATE_SUCCESS", payload: res });
      } catch (error) {
        dispatch({ type: "UPDATE_FAIL", payload: error });
      }
      setError("");
    } catch (err) {
      setError("An error occurred during update");
    }
  };

  // Function to handle cancel button
  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/");
  };

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // useEffect to fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserCall(currentUser._id);
        setUser(user);
        setUsername(user.username);
        setFirstName(user.firstName);
        setSurname(user.surname);
        setEmail(user.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      { currentUser.role === "admin" && <AdminNavbar /> }
      { currentUser.role !== "admin" && <Navbar /> }
      <div className="edit-profile">
        <div className="edit-profile-container">
          <div className="edit-profile-form-wrapper">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
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
                  placeholder="Enter new password if you want to change"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="retypePassword">Retype Password:</label>
                <input
                  type="password"
                  id="retypePassword"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture: <span>{user? user.profilePicture : ""}</span></label>
                <input
                  type="file"
                  id="profilePicture"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <div className="form-buttons">
                <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
                <button className="submit-button" type="submit">Update</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
