import React, { Component } from "react";
import { toast } from "react-toastify";

export default class AdminOrders extends Component {
  state = { orders: [] };

  componentDidMount() {
    try {
      const response = async () =>
        await fetch("http://localhost:5000/api/order/all")
          .then((res) => res.json())
          .then((data) => this.setState({ orders: data.data }));
      const data = response.json();
      if (data.ok) {
        toast.success("با موفقیت آپدیت شد");
      } else {
        console.log(data);
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      const data = response.json();
      if (data.ok) {
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
      <div>
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
