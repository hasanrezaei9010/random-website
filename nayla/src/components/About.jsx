import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import "../css/about.css";

export default class About extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <div className="about-page">
        <div className="about-header"><h1>درباره ما</h1><p>چیزی که ما را متفاوت می‌کند</p></div>
        <div className="about-grid">
          <div className="about-text">
            <h2>داستان ما</h2>
            <p>از ۱۳۹۵، واردات موتورسیکلت‌های برندهای معتبر جهان. تیم ما عاشق موتور است.</p>
            <h2>چرا ما؟</h2>
            <ul><li>✔ ضمانت اصالت</li><li>✔ قیمت رقابتی</li><li>✔ مشاوره تخصصی</li></ul>
          </div>
          <div className="about-image"><img src="landscape.jpg"></img></div>
        </div>
      </div>
    </>);
  }
}
