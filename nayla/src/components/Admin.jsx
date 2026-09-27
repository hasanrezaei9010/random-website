import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import AdminOrders from "./AdminOrders.jsx";
import AdminProducts from "./AdminProducts.jsx";
import AdminUsers from "./AdminUsers.jsx";
import UploadProducts from "./UploadProducts.jsx";
import { useNavigate } from "react-router-dom";
import "../css/admin2.css";
import "../css/notification.css";

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

class Admin extends Component {
  state = {
    background: true,
    admin: null,
    asideListOpen: true,
    activeTab: "products",
    notifications: [],
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
        headers: { "Content-Type": "application/json" ,
           "x-auth-token": localStorage.getItem("token")
        },
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

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/task/notification",
        { method : "GET",
          headers: { "Content-Type" : "application/json"},
        }
      );
      const data = await response.json();
      if (response.ok) {
        this.setState({ notifications: data.data.notifications });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchNotifications();
  }

  render() {
    return (
      <div className={this.state.background ? null : "dark"} id="father-of-all">
        <header className="admin-header">
          <div className="header-div">
            <div>
              <i onClick={this.toggleSidebar} className="fa-solid fa-list"></i>
              <i
                onClick={this.handleLogout}
                className="fa-solid fa-power-off"
              ></i>
              <span className="bell-wrapper">
                <i
                  className="fa-solid fa-bell"
                  onClick={this.fetchNotifications}
                  popoverTarget="notif-popover"
                  popoverTargetAction="toggle"
                ></i>
                {this.state.notifications ? this.state.notifications.map(
                  (notification,index) =>
                  <span key={index} className="notif-badge">
                    {notification}
                  </span>
                ) : null}
              </span>
            </div>
          </div>
          <div className="header-div">
            <span>last online monday</span>
            <button onClick={this.toggleBackground}>
              {this.state.background ? "light" : "dark"}
            </button>
          </div>
        </header>
        <dialog id="notif-popover" className="notif-popover" popover="manual">
          <button
            id="close-notif"
            popoverTargetAction="hide"
            popoverTarget="notif-popover"
          >
            ×
          </button>

          <div className="notif-header">
            <h3>اعلان‌ها</h3>
          </div>

          <div className="notif-list">
            {this.state.notifications.length === 0 ? (
              <p className="no-notif">اعلان جدیدی ندارید</p>
            ) : (
              this.state.notifications.map((n, i) => (
                <div
                  key={n._id}
                  className="notif-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <strong>{n.title}</strong>
                  <p>{n.message}</p>
                  <small>{new Date(n.date).toLocaleString("fa-IR")}</small>
                </div>
              ))
            )}
          </div>
        </dialog>

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
            <a href="/a" className="active">
              <i className="fa-solid fa-box-open"></i>
              <span onClick={this.props.navigate("/adminproducts")}>
                محصولات
              </span>
            </a>
            <a href="">
              <i className="fa-solid fa-file-invoice"></i>
              <span onClick={this.props.navigate("/adminorders")}>
                سفارش ها
              </span>
            </a>
            <a href="">
              <i className="fa-solid fa-users"></i>
              <span onClick={this.props.navigate("/adminusers")}>کاربر ها</span>
            </a>
            <a href="">
              <i className="fa-solid fa-plus"></i>
              <span onClick={this.props.navigate("/uploadproducts")}>
                افزودن محصول
              </span>
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
          <div>
            <AdminOrders />
            <AdminProducts />
          </div>
          <div>
            <AdminUsers />
            <UploadProducts />
          </div>
        </section>
      </div>
    );
  }
}

export default function AdminWrapper() {
  const navigate = useNavigate();
  return <Admin navigate={navigate} />;
}
