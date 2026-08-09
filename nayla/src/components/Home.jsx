import React, { Component } from "react";
import Context from "../context.js";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Movingstrip from "./Movingstrip.jsx";
// import "../css/home-gold.css";
 import "../css/home-red.css";

export default class Home extends Component {
  static contextType = Context;
  render() {
    return (
      <>
      <Movingstrip />
        <Navbar />
        <main className="home-main">
          <section className="hero">
            <div className="hero-image"><div className="hero-img-placeholder"></div></div>
            <div className="hero-content">
              <h1>سواری با <span>استایل</span></h1>
              <p>موتورسیکلت‌های اصل، با طراحی بی‌نظیر</p>
              <button className="btn-primary">کاتالوگ</button>
            </div>
          </section>
          <section className="stats">
            <div className="stat-item"><span className="stat-number">۱۰+</span><p>سال تجربه</p></div>
            <div className="stat-item"><span className="stat-number">۵۰+</span><p>برند</p></div>
            <div className="stat-item"><span className="stat-number">۱۰۰۰+</span><p>مشتری</p></div>
          </section>
          <section className="featured">
            <h2>محصولات ویژه</h2>
            <div className="product-grid">
              <div className="product-card">
                <div className="card-img-placeholder"></div>
                <h3>هوندا CB400</h3>
                <p>۴۰۰ سی‌سی • ۲۰۲۵</p>
                <span className="price">۲۵۰M</span>
                <button className="btn-outline">مشاهده</button>
              </div>
              <div className="product-card">
                <div className="card-img-placeholder"></div>
                <h3>یاماها MT-07</h3>
                <p>۷۰۰ سی‌سی • ۲۰۲۴</p>
                <span className="price">۳۸۰M</span>
                <button className="btn-outline">مشاهده</button>
              </div>
              <div className="product-card">
                <div className="card-img-placeholder"></div>
                <h3>دوکاتی پانیگاله</h3>
                <p>۹۵۰ سی‌سی • ۲۰۲۵</p>
                <span className="price">۶۵۰M</span>
                <button className="btn-outline">مشاهده</button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}