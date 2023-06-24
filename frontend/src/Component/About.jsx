import React from 'react';
import '../Assets/css/About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
        <div className="container">
          <h2 className="about-heading">Welcome to AlgoFeel</h2>
          <p className="about-description">
            AlgoFeel is an immersive web application that brings algorithms to life through captivating visualizations. Embark on a journey of discovery, exploration, and learning as you delve into the fascinating world of algorithms.
          </p>
          <div className="feature-section">
            <h3 className="feature-heading">Explore Algorithms in Action</h3>
            <ul className="feature-list">
              <li className="feature-item">Immerse yourself in interactive visualizations of popular algorithms like sorting, searching, graph algorithms, and more.</li>
              <li className="feature-item">Follow the step-by-step visual representations to understand the inner workings of algorithms.</li>
              <li className="feature-item">Customize inputs and algorithm parameters to observe different scenarios and behaviors.</li>
            </ul>
          </div>
          <div className="learn-section">
            <h3 className="learn-heading">Learn and Master Algorithmic Concepts</h3>
            <p className="learn-description">
              AlgoFeel serves as a powerful educational tool for algorithm enthusiasts of all levels. Simplify complex concepts, gain insights, and enhance your problem-solving skills through an engaging learning experience.
            </p>
          </div>
          <div className="future-section">
            <h3 className="future-heading">Join us on the AlgoFeel Journey</h3>
            <p className="future-description">
              We are dedicated to expanding AlgoFeel's offerings, adding new algorithms, and providing comprehensive educational resources to empower your algorithmic exploration. Together, let's unlock the magic and potential of algorithms.
            </p>
          </div>
        </div>
      </section>
    );
  }

export default About;
