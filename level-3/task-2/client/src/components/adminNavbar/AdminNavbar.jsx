import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './admin-navbar.css';
import { UserContext } from '../../context/UserContext';

const AdminNavbar = () => {
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await dispatch({ type: "LOG_OUT" });
    navigate(0);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "manage_mate_logo.png" } alt="Logo" className="navbar-logo" />
        <ul className="navbar-list left">
          <li className="navbar-item">
            <Link to="/admin">Dashboard</Link>
          </li>
        </ul>
      </div>
      <ul className="navbar-list right">
        <li className="navbar-item">
          <Link to="/admin/users">User Management</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/projects">Project Management</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/tasks">Task Management</Link>
        </li>
        <li className="navbar-item user-profile" onClick={toggleDropdown}>
          <img src={process.env.REACT_APP_PROFILE_FOLDER + (currentUser.profilePicture || "blankProfilePicture.png")} alt="Profile" className="profile-picture" />
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/admin/edit-profile">Edit Profile</Link>
              <span onClick={handleLogout}>Log Out</span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
