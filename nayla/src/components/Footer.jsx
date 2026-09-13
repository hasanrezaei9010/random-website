import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/footer-red.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        
          <p>© {new Date().getFullYear()} MotoShop</p>
          <div className="footer-links">
            <Link to="/about">درباره</Link>
            <Link to="/contact">تماس</Link>
            <Link to="/service">خدمات</Link>
          </div>
      
      </footer>
    );
  }
}

