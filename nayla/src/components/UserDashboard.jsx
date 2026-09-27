import React, { Component } from "react";
import MyOrders from "./MyOrders.jsx";
import EditProfile from "./EditProfile.jsx";
import Cart from "./Cart.jsx";
import "../css/user-dashboard.css";

export default class UserDashboard extends Component {
  render() {
    return (
      <div className="user-dashboard">
        <h1>پنل کاربری</h1>
        
        <div>
          <h2 className="section-title">سفارشات من</h2>
          <MyOrders />
        </div>
        
        <div>
          <h2 className="section-title">ویرایش پروفایل</h2>
          <EditProfile />
        </div>

        <div>
          <h2 className="section-title">سبد خرید</h2>
          <Cart />
        </div>
      </div>
    );
  }
}
