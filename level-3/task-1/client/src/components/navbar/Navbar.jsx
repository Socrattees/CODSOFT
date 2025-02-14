import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import NavbarCart from "../navbarCart/NavbarCart"; // Import your ShoppingCart component
import { getCartByUserIdCall } from "../../apiCalls";

const Navbar = () => {
  const { user, cart, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState(""); // State to manage search input
  const [isCartVisible, setIsCartVisible] = useState(false); // State to manage cart visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const [isGuest, setIsGuest] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search.trim());
    navigate(`/search/search-results?q=${search}`);
  };

  // Function to remove user and cart from local storage after logout
  const handleLogout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout?");
    if (logoutConfirm) {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.reload();
    }
  };

  // Function to limit cart visibility to non-checkout pages
  const toggleCartVisibility = () => {
    if (!location.pathname.includes("/checkout")) {
      setIsCartVisible(!isCartVisible);
    }
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /* useEffect to get the cart by userId
  from the server to have the latest cart data in context
  and local storage */
  useEffect(() => {
    if (user) {
      const getCart = async () => {
        try {
          const res = await getCartByUserIdCall(user._id);
          dispatch({ type: "SET_CART", payload: res });
        } catch (err) {
          console.error("Error in getting cart: ", err);
        }
      }
      getCart();
    }
  }, [user, dispatch]);

  // useEffect to check if the user is a guest
  useEffect(() => {
    if (user) {
      setIsGuest(false);
    }
  }, [user]);

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link to="/" aria-label="Home link">
        <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
      </Link>
      <Link to="/profile" id="navbar-user-link" aria-label="Profile link">
        <span className="navbar-user">{ user ? user.username : "Guest" }</span>
      </Link>
      <form
        className="navbar-search-wrapper" onSubmit={handleSearch} aria-label="Search box">
        <input
          className="navbar-search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search Input"
        />
      </form>
      <ShoppingCartIcon
        fontSize="large"
        id="navbar-cart-small-screen"
        className="navbar-cart-icon"
        onClick={toggleCartVisibility}
        aria-label="Cart"
      />
      <div className="navbar-menu-icon" onClick={toggleMenu} aria-label="Menu">
        {isMenuOpen ?
          <CloseIcon fontSize="large" aria-label="Close Menu"/>
          : <MenuIcon fontSize="large" aria-label="Open Menu"/>
        }
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`} aria-label="Navigation Links">
        <li className="navbar-user-wrapper">
          <Link
            to="/profile"
            className="navbar-user"
            aria-label="Profile link"
          >
            { user ? user.username : "Guest" }
          </Link>
        </li>
        <li><Link to="/" aria-label="Home link">Home</Link></li>
        <li><Link to="/about" aria-label="About link">About</Link></li>
        <li><Link to="/contact" aria-label="Contact link">Contact</Link></li>
        <li id="navbar-cart-big-screen">
          <ShoppingCartIcon
            className="navbar-cart-icon"
            onClick={toggleCartVisibility}
            aria-label="Cart"
            disabled={isGuest}
          />
        </li>
        <li>{ user ?
          <span className="logout" onClick={handleLogout} aria-label="Logout">Logout</span>
          : <Link to="/login" aria-label="Login">Login</Link>}
        </li>
      </ul>
      {isCartVisible && !isGuest &&
        <NavbarCart
          user={user}
          cart={cart}
          dispatch={dispatch}
          setIsCartVisible={setIsCartVisible}
          aria-label="Open Cart"
        />
      }
    </nav>
  );
};

export default Navbar;