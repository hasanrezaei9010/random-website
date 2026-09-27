import React, { Component } from "react";
import "../css/contact.css";

export default class Contact extends Component {
  render() {
    return (
      <div className="contact-page">
        <h1>تماس با ما</h1>
        <p className="subtitle">همیشه در دسترس هستیم</p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item"><span>📞</span><div><h4>تلفن</h4><p>۰۲۱-۱۲۳۴۵۶۷۸</p></div></div>
            <div className="contact-item"><span>✉️</span><div><h4>ایمیل</h4><p>info@motorshop.com</p></div></div>
            <div className="contact-item"><span>📍</span><div><h4>آدرس</h4><p>تهران، ولیعصر، پلاک ۱۲۳</p></div></div>
            <div className="contact-item"><span>🕒</span><div><h4>ساعات کاری</h4><p>شنبه تا پنجشنبه ۹ تا ۶</p></div></div>
          </div>
          <div className="contact-map"><div className="map-placeholder"></div></div>
        </div>
      </div>
    );
  }
}
