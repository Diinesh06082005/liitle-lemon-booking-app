import React from 'react';
import Nav from './Nav';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <img
          src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api/assets/logo.png"
          alt="Little Lemon logo"
          className="header-logo"
        />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
