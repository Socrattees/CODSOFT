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
  const [search, setSearch] = useState("");
  const [isCartVisible, setIsCartVisible] = useState(false); // State to manage cart visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search.trim());
    navigate(`/search/search-results?q=${search}`);
    console.log(search);
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

  const toggleCartVisibility = () => {
    if (!location.pathname.includes("/checkout")) {
      setIsCartVisible(!isCartVisible);
    }
  };

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

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-logo" src="/victory_vault_logo.png" alt="Victory Vault" />
      </Link>
      <Link to="/profile" id="navbar-user-link">
        <span className="navbar-user">{ user ? user.username : "Guest" }</span>
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
      <ShoppingCartIcon fontSize="large" id="navbar-cart-small-screen" className="navbar-cart-icon" onClick={toggleCartVisibility} />
      <div className="navbar-menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon fontSize="large"/> : <MenuIcon fontSize="large" />}
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li className="navbar-user-wrapper">
          <Link to="/profile" className="navbar-user">{ user ? user.username : "Guest" }
          </Link>
        </li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li id="navbar-cart-big-screen">
          <ShoppingCartIcon className="navbar-cart-icon" onClick={toggleCartVisibility} />
        </li>
        <li>{ user ?
          <span className="logout" onClick={handleLogout}>Logout</span>
          : <Link to="/login">Login</Link>}
        </li>
      </ul>
      {isCartVisible && <NavbarCart user={user} cart={cart} dispatch={dispatch} setIsCartVisible={setIsCartVisible} />} {/* Conditionally render the ShoppingCart component */}
    </nav>
  );
};

export default Navbar;