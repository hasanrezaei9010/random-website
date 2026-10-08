import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import "../css/service.css";

export default class Services extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <div className="services-page">
        <h1>خدمات ما</h1>
        <p className="subtitle">آنچه می‌توانید از ما انتظار داشته باشید</p>
        <div className="services-grid">
          <div className="service-card"><div className="service-icon">🏍️</div><h3>فروش موتور</h3><p>انواع شهری، اسپرت و آفرود</p></div>
          <div className="service-card"><div className="service-icon">🔧</div><h3>تعمیرات</h3><p>تعمیرات موتور و برق</p></div>
          <div className="service-card"><div className="service-icon">🧩</div><h3>قطعات یدکی</h3><p>قطعات اصلی از برندهای معتبر</p></div>
          <div className="service-card"><div className="service-icon">📞</div><h3>مشاوره</h3><p>مشاوره رایگان قبل از خرید</p></div>
        </div>
      </div>
    </>);
  }
}

