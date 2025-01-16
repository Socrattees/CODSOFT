import React from 'react';
import './navbar.css';

/* Navigation bar component that displays the logo, search bar,
and links that sits at the top of the page */

const Navbar = () => {
  return (
    <nav className="navbar">
        <a href="/">
          <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
        </a>
      <input className="navbar-search" type="text" placeholder="Search..." />
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;