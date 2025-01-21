import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

/* Navigation bar component that displays the logo, search bar,
and links that sits at the top of the page */

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
      </Link>
      <input className="navbar-search" type="text" placeholder="Search..." />
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;