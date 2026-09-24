import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import AdminOrders from "./AdminOrders.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AdminUsers from "./AdminUsers.jsx";
import UploadProducts from "./UploadProducts.jsx";
//import "../css/admin.css";
import '../css/admin2.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "شنبه", sales: 4000 },
  { name: "یکشنبه", sales: 3000 },
  { name: "دوشنبه", sales: 2000 },
  { name: "سه شنبه", sales: 2700 },
  { name: "چهار شنبه", sales: 3850 },
];

export default class Admin extends Component {
  state = {
    background: true,
    admin: null,
    asideListOpen: true,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ asideListOpen: !prevState.asideListOpen }));
  };
  toggleBackground = () => {
    this.setState((prevState) => ({ background: !prevState.background }));
  };

  fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/recieve", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const finalResponse = await response.json();
      if (response.ok) {
        this.setState({
          admin: finalResponse.data,
        });
        console.log("users recieved successfully");
      } else {
        console.log("failed to fetch user", finalResponse);
      }
    } catch (error) {
      console.log("connection to the server failed", error);
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className={this.state.background ? null : "dark"} id="father-of-all">
        <header className="admin-header">
          <div className="header-div">
            <div>
              <i onClick={this.toggleSidebar} className="fa-solid fa-list"></i>
              <input type="search" name="" id="" />
            </div>
            <div>
              <i className="fa-solid fa-power-off"></i>
              <i className="fa-solid fa-bell"></i>
              <i className="fa-solid fa-gear"></i>
            </div>
          </div>
          <div className="header-div">
            <span>last online monday</span>
            <button onClick={this.toggleBackground}>
              {this.state.background ? "light" : "dark"}
            </button>
          </div>
        </header>
        <aside className={this.state.asideListOpen ? null : "closed"}>
          <div className="admin-section">
            <div className="admin-div">
              <img
                src={this.state.admin ? this.state.admin.picture : null}
                alt={this.state.admin ? this.state.admin.name : null}
                loading="lazy"
              />
              <span>{this.state.admin ? this.state.admin.name : null}</span>
            </div>
            <div className="admin-div">
              <span>آخرین بازدید</span>
              <span> آنلاین</span>
            </div>
          </div>
          <div className="pages">
            <a href="" className="active">
              <i className="fa-solid fa-box-open"></i>
              <span>محصولات</span>
            </a>
            <a href="">
              <i className="fa-solid fa-file-invoice"></i>
              <span>سفارش ها</span>
            </a>
            <a href="">
              <i className="fa-solid fa-chart-pie"></i>
              <span>گزارش ها</span>
            </a>
            <a href="">
              <i className="fa-solid fa-phone"></i>
              <span>پشتیبانی</span>
            </a>
            <a href="">
              <i className="fa-solid fa-users"></i>
              <span>کاربر ها</span>
            </a>
          </div>
        </aside>
        <section id="chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section>
          <div><AdminOrders/><AdminProducts/></div>
          <div><AdminUsers/><UploadProducts/></div>
        </section>
      </div>
    );
  }
}
