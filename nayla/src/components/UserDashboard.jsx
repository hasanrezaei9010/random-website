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
          <MyOrders />
        </div>
        
        <div>
          <EditProfile />
        </div>

        <div>
          <Cart />
        </div>
      </div>
    );
  }
}
