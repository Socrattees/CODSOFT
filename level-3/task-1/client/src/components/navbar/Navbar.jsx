import React from "react";
import { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

/* Navigation bar component that displays the logo, search bar,
and links that sits at the top of the page */

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search.trim());
    navigate(`/search/search-results?q=${search}`);
    console.log(search);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
      </Link>
      <form
        className="navbar-search-wrapper" onSubmit={handleSearch}>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
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