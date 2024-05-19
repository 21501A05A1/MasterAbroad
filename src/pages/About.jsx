// About.js

import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="fs-2 mb-4">About Us</h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="https://plus.unsplash.com/premium_photo-1683887034145-228645f2e685?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbXB1c3xlbnwwfHwwfHx8MQ%3D%3D" alt="About" className="about-image" />
          </div>
          <div className="col-md-6">
            <div className="about-content">
              <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
              <hr />
              <p className="lead mb-4">
                Our application is dedicated to assisting prospective graduate students in navigating the admissions process for Master's degree programs in the United States. Through personalized insights, a supportive community, and informed decision-making, we empower users to achieve their academic goals. Key features include a predictive model for admission probabilities, an experience-sharing platform, and robust data privacy measures. We welcome user feedback and acknowledge our collaborators' contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
