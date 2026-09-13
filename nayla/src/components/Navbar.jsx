import React, { Component } from "react";
import { Link } from "react-router-dom";
 import "../css/navbar-red.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="brand">🏍️ MotoShop</Link>
        <div className="nav-links">
          <Link className="nav-btn" to="/">خانه</Link>
          <Link className="nav-btn" to="/about">درباره</Link>
          <Link className="nav-btn" to="/service">خدمات</Link>
          <Link className="nav-btn" to="/contact">تماس</Link>
          <Link className="nav-btn" to="/login">ورود</Link>
        </div>
      </nav>
    );
  }
}
