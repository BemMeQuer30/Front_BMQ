import React from "react";
import Header from "../Header";
import Footer from "../footer";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  return (
    <div className="user-layout">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>{" "}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
