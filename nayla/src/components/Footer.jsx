import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

export default class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="footer">
        <div className="footer-container">
          {/* برند */}
          <div className="footer-brand">
            <h3>Moto<span>Shop</span></h3>
            <p>
              فروشگاه تخصصی موتورسیکلت با بهترین برندها و قیمت‌ها. تجربه‌ی
              خرید مطمئن و راحت را با ما داشته باشید.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="اینستاگرام">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="تلگرام">
                <i className="fa-brands fa-telegram"></i>
              </a>
              <a href="#" aria-label="واتساپ">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#" aria-label="لینکدین">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div className="footer-column">
            <h4>دسترسی سریع</h4>
            <ul>
              <li><Link to="/">صفحه اصلی</Link></li>
              <li><Link to="/about">درباره ما</Link></li>
              <li><Link to="/service">خدمات</Link></li>
              <li><Link to="/contact">تماس با ما</Link></li>
            </ul>
          </div>

          {/* خدمات مشتریان */}
          <div className="footer-column">
            <h4>خدمات مشتریان</h4>
            <ul>
              <li><Link to="/cart">سبد خرید</Link></li>
              <li><Link to="/my-orders">سفارشات من</Link></li>
              <li><Link to="/dashboard">پنل کاربری</Link></li>
              <li><Link to="/contact">پیگیری سفارش</Link></li>
            </ul>
          </div>

          {/* تماس */}
          <div className="footer-column">
            <h4>تماس با ما</h4>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <span>آدرس</span>
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <div>
                <span>تلفن</span>
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <span>ایمیل</span>
                <span>info@motorshop.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="footer-bottom">
          <p>© {currentYear} MotoShop - تمامی حقوق محفوظ است.</p>
          <div className="footer-links">
            <a href="#">قوانین و مقررات</a>
            <a href="#">حریم خصوصی</a>
            <a href="#">سوالات متداول</a>
          </div>
        </div>
      </footer>
    );
  }
}
