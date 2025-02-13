import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }
    await dispatch({ type: "LOG_OUT" });
    navigate(0);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "manage_mate_logo.png" } alt="Logo" className="navbar-logo" />
        <ul className="navbar-list left">
          <li className="navbar-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="navbar-item">
            <span>{currentUser.username}</span>
          </li>
        </ul>
      </div>
      <ul className="navbar-list right">
        <li className="navbar-item">
          <Link to="/home/members">Members</Link>
        </li>
        <li className="navbar-item">
          <Link to="/home/projects">Projects</Link>
        </li>
        <li className="navbar-item">
          <Link to="/home/tasks">Tasks</Link>
        </li>
        <li className="navbar-item user-profile" onClick={toggleDropdown}>
          <img src={process.env.REACT_APP_PROFILE_FOLDER + (currentUser.profilePicture || "blankProfilePicture.png")} alt="Profile" className="profile-picture" />
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/edit-profile">Edit Profile</Link>
              <span onClick={handleLogout}>Log Out</span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
