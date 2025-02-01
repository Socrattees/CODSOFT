import React from "react";
import { useState } from "react";
import "./contact.css";
import Navbar from "../../components/navbar/Navbar";
import { createMessageCall } from "../../apiCalls";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Forward message to server
    const createMessage = async () => {
      try {
        await createMessageCall(formData);
      } catch (err) {
        console.log("Error creating new message: ", err);
      }
    };
    createMessage();
    // Reset form data and show alert
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    window.alert("Message successfully sent!");
  };

  return (
    <div className="contact">
      <Navbar />
      <h1>Contact Us</h1>
      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact Form">
          <div className="contact-form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Name"
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Email"
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Message"
            ></textarea>
          </div>
          <button type="submit" aria-label="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;