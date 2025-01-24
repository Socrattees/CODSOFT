import React from "react";
import "./navbar.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/* Navigation bar component that displays the logo, search bar,
and links that sits at the top of the page */

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search.trim());
    navigate(`/search/search-results?q=${search}`);
    console.log(search);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
      </Link>
      <span className="navbar-user">{ user ? user.username : "Guest" }</span>
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
        <li>
          <ShoppingCartIcon className="navbar-cart-icon" />
        </li>
        <li>{ user ?
          <span className="logout" onClick={handleLogout}>Logout</span>
          : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;