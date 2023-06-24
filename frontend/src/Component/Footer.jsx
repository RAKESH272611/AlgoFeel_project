import React from 'react';
import '../Assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2023 AlgoFeel. Made with ♥.</p>
        <div className="social-media">
          <a href="https://codeforces.com/profile/rakesh272611" target="_blank" rel="noopener noreferrer">
            Codeforces
          </a>
          <a href="https://www.codechef.com/users/rakesh272611" target="_blank" rel="noopener noreferrer">
            CodeChef
          </a>
          <a href="https://leetcode.com/PROFESSOR_RAKESH" target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
