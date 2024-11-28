import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const [showLogout, setShowLogout] = useState(false);

  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const disableLinks = false;

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://front-bmq.vercel.app/midia/logo2.png"
          className="logo"
          alt="Logo Bem me quer"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <nav className="navbar-container">
        <ul className="navbar">
          <li>
            {disableLinks ? (
              <span className="disabled">Skincare</span>
            ) : (
              <Link to="/skincare">Skincare</Link>
            )}
          </li>
          <li>
            {disableLinks ? (
              <span className="disabled">Pele</span>
            ) : (
              <Link to="/pele">Pele</Link>
            )}
          </li>
          <li>
            {disableLinks ? (
              <span className="disabled">Olhos</span>
            ) : (
              <Link to="/olhos">Olhos</Link>
            )}
          </li>
          <li>
            {disableLinks ? (
              <span className="disabled">Boca</span>
            ) : (
              <Link to="/boca">Boca</Link>
            )}
          </li>
          <li>
            {disableLinks ? (
              <span className="disabled">Vegan</span>
            ) : (
              <Link to="/vegan">Vegan</Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="navbar-container">
        {user ? (
          <div className="user-details">
            <img
              className="user-avatar"
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              alt="Avatar"
              onClick={handleUserClick}
            />
            <span className="user-name"> Olá, {user.name}</span>
            <Link to="/cart" className="cart-icon">
              <img
                src="https://cdn.icon-icons.com/icons2/1147/PNG/512/1486486306-arrow-cart-commerce-shopping-up-upload_81215.png"
                alt="Cart"
              />
            </Link>
            {showLogout && (
              <button className="logout-button" onClick={handleLogout}>
                Deslogar
              </button>
            )}
          </div>
        ) : (
          <div className="login-link">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
