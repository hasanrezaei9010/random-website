import React, { Component } from "react";
import { Link } from "react-router-dom";
/*  import "../css/navbar-red.css"; */
import "../css/navbar2.css";

export default class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  render() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
      <nav className="navbar">
        <Link to="/" className="brand">
          🏍️ MotoShop
        </Link>
        <div className="nav-links">
          <Link className="nav-btn" to="/">
            خانه
          </Link>
          <Link className="nav-btn" to="/cart">
            سبد خرید
          </Link>
          <Link className="nav-btn" to="/about">
            درباره
          </Link>
          <Link className="nav-btn" to="/service">
            خدمات
          </Link>
          <Link className="nav-btn" to="/contact">
            تماس
          </Link>
          {user ? (
            <>
              <Link className="nav-btn" to="/dashboard">
                داشبورد
              </Link>
              <button onClick={this.handleLogout}>خروج</button>
            </>
          ) : (
            <Link className="nav-btn" to="/login">
              ورود
            </Link>
          )}
        </div>
      </nav>
    );
  }
}
