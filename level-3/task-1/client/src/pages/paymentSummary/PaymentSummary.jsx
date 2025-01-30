import React, { useState, useEffect, useContext } from "react";
import "./payment-summary.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { UserContext } from "../../context/UserContext";

const PaymentSummary = () => {
  const [loading, setLoading] = useState(true);
  const { user, cart, dispatch } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const userDetails = {
    name: user.firstName + " " + user.surname,
    email: user.email,
  };

  const address = {
    street: user.address.streetAddress,
    suburb: user.address.suburb,
    city: user.address.city,
    state: user.address.province,
    zip: user.address.postalCode,
    country: user.address.country
  };

  const paymentMethod = {
    cardType: "Visa",
    cardNumber: location.state.cardNumber || "**** **** **** 1234",
  };

  // Function to mask the card number
  const maskCardNumber = (cardNumber) => {
    return cardNumber.slice(-4).padStart(cardNumber.length, '*');
  };

  // Function to format the price value
  const formattedPrice = (total) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(total);
  };

  const handleConfirmPayment = () => {
    // Handle payment confirmation logic here
    alert("Payment Confirmed!");
  };

  useEffect(() => {
    if (!location.state?.fromPayment) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="payment-summary">
      <Navbar />
      <h1>Payment Summary</h1>
      <div className="payment-summary-details">
        <div className="payment-summary-details-group">
          <h2>User Details</h2>
          <p><span>Name:</span> {userDetails.name}</p>
          <p><span>Email:</span> {userDetails.email}</p>
        </div>
        <div className="payment-summary-details-group">
          <h2>Address</h2>
          <p><span>Street:</span> {address.street}</p>
          <p><span>City:</span> {address.city}</p>
          <p><span>State:</span> {address.state}</p>
          <p><span>ZIP:</span> {address.zip}</p>
        </div>
        <div className="payment-summary-details-group">
          <h2>Payment Method</h2>
          <p><span>Card Type:</span> {paymentMethod.cardType}</p>
          <p><span>Card Number:</span> {maskCardNumber(paymentMethod.cardNumber)}</p>
        </div>
        <p><span>Total:</span> {formattedPrice(calculateTotalPrice())}</p>
        <div className="payment-summary-buttons">
          <button className="cancel" onClick={() => navigate("/")}>Cancel Payment</button>
          <button className="confirm" onClick={handleConfirmPayment}>Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;