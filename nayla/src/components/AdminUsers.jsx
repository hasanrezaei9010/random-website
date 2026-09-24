import React, { Component } from "react";
import { toast } from "react-toastify";
import '../css/admin-users.css';

export default class AdminUsers extends Component {
  state = { users: [] };

  fetchAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/all");
      const data = await response.json();
      console.log("data is here", data);
      if (response.ok) {
        console.log("i exist");
        this.setState({ users: data.data });
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchAll();
  }

  toggleAdmin = async (id) => {
    await fetch(`http://localhost:5000/api/user/${id}/toggle-admin`, {
      method: "PUT",
    });
    this.componentDidMount();
  };

  render() {
    return (
      <div className="admin-users">
        <h2>مدیریت کاربران</h2>
        <div className="users-grid">
        {this.state.users.map((user) => (
          <div key={user._id} className="users-card">
            <div className="users-info">
            <span>{user.name}</span>
            <span>{user.email}</span>
            </div>
            <button onClick={() => this.toggleAdmin(user._id)}>
              {user.admin ? "حذف ادمین" : "ارتقا به ادمین"}
            </button>
          </div>
        ))}
        </div>
      </div>
    );
  }
}
