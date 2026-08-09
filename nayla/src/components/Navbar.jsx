import React, { Component } from "react";
import { Link } from "react-router-dom";
 import "../css/navbar-gold.css";
// import "../css/navbar-red.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="brand">🏍️ MotoShop</Link>
        <div className="nav-links">
          <Link to="/">خانه</Link>
          <Link to="/about">درباره</Link>
          <Link to="/service">خدمات</Link>
          <Link to="/contact">تماس</Link>
          <Link to="/login" className="nav-btn">ورود</Link>
        </div>
      </nav>
    );
  }
}
