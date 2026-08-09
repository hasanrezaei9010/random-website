import React from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { Route, Routes } from "react-router-dom";
import MovingStrip from "./components/Movingstrip.jsx";
import Home from "./components/Home.jsx";
import Context from "./context.js";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Knowledge from "./components/Knowledge.jsx";
import Service from "./components/Service.jsx";
import { useEffect, useRef} from "react";

export default function App() {
  const snowRef = useRef(null);

  useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/@zachleat/snow-fall@1.0.3/snow-fall.js");
  }, []);

  return (
    <>
      <Context.Provider value={{}}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/service" element={<Service />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Context.Provider>
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