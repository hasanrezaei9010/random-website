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
import "../css/home2.css";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

class Home extends Component {
  static contextType = Context;

  state = {
    products: [],
  };

  fetchProduct = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/product/recieve`,
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
      } else {
        toast.error("something went wrong")
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <>
        <Movingstrip />
        <Navbar />
        <Heading />
        <main className="home-main">
          <section className="hero">
            <div className="hero-image">
              <img src="landscape.jpg" loading="lazy"/>
            </div>
            <div className="hero-content">
              <h1>
                سواری با <span>استایل</span>
              </h1>
              <p>موتورسیکلت‌های اصل، با طراحی بی‌نظیر</p>
              <button
                onClick={() => this.props.navigate("/about")}
                className="btn-primary"
              >
                کاتالوگ
              </button>
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
                    <SwiperSlide key={product._id}>
                      <div className="product-card">
                        <img
                          className="card-img-placeholder"
                          src={`${API_URL}${product.picture}`}
                          alt={product.name}
                          loading="lazy"
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span className="price">{product.price}</span>
                        <button
                          onClick={() => {
                            this.props.navigate(`/product/${product._id}`, {
                              state: { product },
                            });
                          }}
                          className="btn-outline"
                        >
                          مشاهده
                        </button>
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

export default function HomeWrapper() {
  const navigate = useNavigate();
  return <Home navigate={navigate} />;
}
