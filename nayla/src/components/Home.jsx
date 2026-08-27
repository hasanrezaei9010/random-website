import React, { Component } from "react";
import Context from "../context.js";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Movingstrip from "./Movingstrip.jsx";
import Heading from "./Heading.jsx";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/* import $ from "jquery";
window.$ = window.jQuery = $; */
/* import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"; */

// import "../css/home-gold.css";
import "../css/home-red.css";

export default class Home extends Component {
  static contextType = Context;

  state = {
    products: [],
  };

  fetchProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/recieve",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const finalResponse = await response.json();
      if (response.ok) {
        this.setState({
          products: finalResponse.data,
        });
        console.log("products recieved successfully");
      } else {
        console.log(finalResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchProduct();
    /* window.jQuery(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: { item: 1 },
        600: { item: 3 },
        1000: { item: 4 },
      },
    }); */
  }

  componentDidUpdate() {}

  /*  componentWillUnmount() {
    window.jQuery(".owl-carousel").trigger("destroy.owl.carousel");
    window.jQuery(".owl-carousel").removeClass("owl-loaded");
  } */

  render() {
    return (
      <>
        <Movingstrip />
        <Navbar />
        <Heading />
        <main className="home-main">
          <section className="hero">
            <div className="hero-image">
              <div className="hero-img-placeholder"></div>
            </div>
            <div className="hero-content">
              <h1>
                سواری با <span>استایل</span>
              </h1>
              <p>موتورسیکلت‌های اصل، با طراحی بی‌نظیر</p>
              <button className="btn-primary">کاتالوگ</button>
            </div>
          </section>
          <section className="stats">
            <div className="stat-item">
              <span className="stat-number">۱۰+</span>
              <p>سال تجربه</p>
            </div>
            <div className="stat-item">
              <span className="stat-number">۵۰+</span>
              <p>برند</p>
            </div>
            <div className="stat-item">
              <span className="stat-number">۱۰۰۰+</span>
              <p>مشتری</p>
            </div>
          </section>
          <section className="featured">
            <h2>محصولات ویژه</h2>
            <Swiper
              modules={[Navigation, Mousewheel]}
              navigation={true}
              mousewheel={true}
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 3 },
                1000: { slidesPerView: 4 },
              }}
            >
              {this.state.products
                ? this.state.products.map((product) => (
                    <SwiperSlide className='product-grid' key={product._id}>
                      <div className="product-card">
                        <img className="card-img-placeholder" src={product.picture} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span className="price">{product.price}</span>
                        <button className="btn-outline">مشاهده</button>
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
