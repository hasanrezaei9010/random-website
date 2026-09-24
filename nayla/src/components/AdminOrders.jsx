import React, { Component } from "react";
import { toast } from "react-toastify";
import '../css/admin-orders.css'

export default class AdminOrders extends Component {
  state = { orders: [] };

  componentDidMount() {
    try {
      const response = async () =>
        await fetch("http://localhost:5000/api/order/all",{
       headers : {"x-auth-token" : localStorage.getItem('token')} }
        )
          .then((res) => res.json())
          .then((data) => this.setState({ orders: data.data }));
      if (response.ok) {
        toast.success("با موفقیت آپدیت شد");
      } else {
        console.log(response);
        toast.error("خطایی رخ داده");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  }

  updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/update/:${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" ,
            "x-auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({ status }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("با موفقیت آپدیت شد");
        this.componentDidMount(); // رفرش لیست
      } else {
        console.log(data);
        toast.error("خطایی رخ داده");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  };

  render() {
    return (
      <div className="admin-orders">
        <h2>مدیریت سفارشات</h2>
        {this.state.orders.map((order) => (
          <div key={order._id} className="order-admin-card">
            <span>سفارش {order._id}</span>
            <span>وضعیت: {order.status}</span>
            <select
              onChange={(e) => this.updateStatus(order._id, e.target.value)}
              value={order.status}
            >
              <option value="pending">در انتظار</option>
              <option value="paid">پرداخت شده</option>
              <option value="shipped">ارسال شده</option>
              <option value="delivered">تحویل داده شده</option>
            </select>
          </div>
        ))}
      </div>
    );
  }
}
