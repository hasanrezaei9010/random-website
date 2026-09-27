import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import './css/app.css';

const Home = lazy(() => import("./components/Home.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const Admin = lazy(() => import("./components/Admin.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"));
const AdminProtectedRoute = lazy(
  () => import("./components/AdminProtectedRoute.jsx"),
);
const Dashboard = lazy(() => import ("./components/UserDashboard.jsx"));
const AdminUsers = lazy(() => import ("./components/AdminUsers.jsx"));
const AdminOrders = lazy(() => import ("./components/AdminOrders.jsx"));
const AdminProducts = lazy(() => import ("./components/AdminProducts.jsx"));
const UploadProducts = lazy(() => import ("./components/UploadProducts.jsx"));
import Context from "./context.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Knowledge from "./components/Knowledge.jsx";
import Service from "./components/Service.jsx";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  const snowRef = useRef(null);

  /* useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/@zachleat/snow-fall@1.0.3/snow-fall.js");
  }, []); */

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div>...در حال بارگذاری</div>}>
        <Context.Provider value={{}}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="/service" element={<Service />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/adminusers" element={<AdminUsers />} />
            <Route path="/adminorders" element={<AdminOrders />} />
            <Route path="/adminproducts" element={<AdminProducts />} />
            <Route path="/uploadproducts" element={<UploadProducts />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </Context.Provider>
      </Suspense>
      <snow-fall
        mode="page"
        ref={snowRef}
        count={1000}
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          "--snow-fall-color": "rebeccapurple",
          backGroundColor: "yellow",
        }}
      ></snow-fall>
    </>
  );
}
