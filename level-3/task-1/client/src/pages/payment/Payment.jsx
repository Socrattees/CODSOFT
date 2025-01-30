import React, { useEffect, useState } from "react";
import "./payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import valid from "card-validator";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardHolderNameValid = valid.cardholderName(name);
    const cardValidation = valid.number(cardNumber);
    const cartType = valid.number(cardNumber).card.niceType;
    const expiryValidation = valid.expirationDate(expiryDate);
    const cvvValidation = valid.cvv(cvv);

    if (!cardHolderNameValid.isValid) {
      setError("Invalid card holder name");
      return;
    }

    if (!cardValidation.isValid) {
      setError("Invalid card number");
      return;
    }
    if (!expiryValidation.isValid) {
      setError("Invalid expiry date");
      return;
    }
    if (!cvvValidation.isValid) {
      setError("Invalid CVV");
      return;
    }

    // Handle payment submission logic here
    console.log("Payment submitted", { cardNumber, expiryDate, cvv, name });
    navigate("/checkout/payment-summary", { state: { fromPayment: true, name, cardNumber, cartType, expiryDate, cvv } });
  };

  useEffect(() => {
    if (!location.state?.fromCheckout) {
      navigate("/checkout");
    } else {
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="payment">
      <Navbar />
      <h1>Payment Page</h1>
      <div className="payment-form-wrapper">
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="name">Name on Card</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <button type="button" onClick={() => navigate("/checkout")}>Cancel Payment</button>
            <button type="submit">Submit Payment</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Payment;