import React from 'react';
import './ServicePage.css';

const ServicePage = () => {
  return (
    <div className="service-container">
      <header className="service-header">
        <h1>Welcome to Our RH Platform</h1>
      </header>
      
      <section className="service-introduction">
        <h2>Our Services</h2>
        <p>
          Our RH platform connects recruiters and candidates with a seamless, AI-powered hiring process. 
          We offer features like resume screening, interview scheduling, and instant chatbot support, 
          making the hiring process faster and more efficient.
        </p>
      </section>

      <section className="service-details">
        <h3>Key Features</h3>
        <ul>
          <li>AI-powered resume screening</li>
          <li>Automated interview scheduling</li>
          <li>Instant chatbot for candidate queries</li>
          <li>Detailed analytics for recruiters</li>
          <li>Easy candidate profile management</li>
        </ul>
      </section>

      <footer className="service-footer">
        <p>&copy; 2025 RH Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServicePage;
