import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="site">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="logo">
            <span className="logo-box">E</span>
            <span>Venuora</span>
          </NavLink>

          <nav className="navigation" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-item ${isActive ? "selected" : ""}`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add-event"
              className={({ isActive }) => `nav-item ${isActive ? "selected" : ""}`}
            >
              Add Event
            </NavLink>
          </nav>

          <div className="admin-badge">
            <span className="admin-dot" />
            Admin
          </div>
        </div>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}