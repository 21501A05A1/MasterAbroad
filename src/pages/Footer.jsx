// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>MasterAbroad</h3>
            <p>Admission Insights for Master's Success</p>
          </div>
          <div className="col-md-3">
            <h4>Explore</h4>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>Email: masterabroad@gmail.com</li>
              <li>Phone: +9123456780</li>
              <li>Address: Kanuru , Vijayawada, India</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; {new Date().getFullYear()} MasterAbroad. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
