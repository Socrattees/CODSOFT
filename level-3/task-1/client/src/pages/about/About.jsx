import React, { useEffect } from 'react';
import './about.css';
import Navbar from '../../components/navbar/Navbar';

const About = () => {

  // useEffect to add background to body of this page
  useEffect(() => {
    document.body.classList.add('about-background');

    // Cleanup function to remove background
    return () => {
      document.body.classList.remove('about-background');
    }
  }, []);

  return (
    <div className="about">
      <Navbar />
      <h1>About Us</h1>
      <div className="about-text" aria-label="About Victory Vault">
        <p>
          Welcome to Victory Vault, 
          your ultimate destination for all things gaming! 
          Founded two years ago in the heart of South Africa, 
          Victory Vault is the brainchild 
          of a passionate South African gamer 
          who envisioned a haven for fellow gaming enthusiasts.
        </p>
        <p>
          At Victory Vault, 
          we are dedicated to providing top-notch gaming products 
          that cater exclusively to the needs of gamers. 
          From the latest gaming consoles and accessories 
          to high-performance gaming PCs and peripherals, 
          we have everything you need to elevate your gaming experience.
        </p>
        <p>Our mission is to create a community 
          where gamers can find the best products, 
          share their experiences, 
          and connect with like-minded individuals. 
          We believe in quality, integrity, 
          and customer satisfaction, 
          and we strive to bring you the best in gaming technology 
          and innovation.
        </p>
        <p>
          Join us on this exciting journey 
          and discover the world of gaming like never before. 
          Welcome to Victory Vault, 
          where every gamer finds their victory!
        </p>
      </div>
    </div>
  );
};

export default About;