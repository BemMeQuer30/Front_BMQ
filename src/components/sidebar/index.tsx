// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Sidebar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="sidebar">
      <div className="img-group">
        <img
          src="https://front-bmq.vercel.app/midia/logo2.png"
          alt="logo"
          className="image"
        />
      </div>
      <div className="avatar-group">
        <img
          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
          alt="Avatar"
        />
        <h3>{user.name}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pedidos
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Sidebar;
