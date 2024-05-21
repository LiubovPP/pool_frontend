import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaVk, FaOdnoklassniki, FaWhatsapp } from 'react-icons/fa';
import logo from '@assets/logo.png';
import '@styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="brand">
          <a href="/"><img src={logo} alt="Logo" /></a>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://vk.com/" target="_blank" rel="noopener noreferrer"><FaVk /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://ok.ru/" target="_blank" rel="noopener noreferrer"><FaOdnoklassniki /></a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
