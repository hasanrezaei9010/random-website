import React, { Component } from "react";
import { toast } from "react-toastify";
import "../css/upload-product.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default class UploadProduct extends Component {
  state = { name: "",description:"", price: "", picture: null };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("picture", this.state.picture);

    try {
      const response = await fetch(`${API_URL}/api/admin/add`, {
        method: "POST",
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("محصول اضافه شد");
      } else {
        toast.error(data.message);
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      error.status = 500;
      throw error;
    }
  };

  render() {
    return (
      <div className="upload-product">
        <h2>بارگذاری محصول</h2>
        <form onSubmit={this.handleSubmit} className="upload-product-form">
          <input
            placeholder="نام"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <input
            placeholder="توضیحات"
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <input
            placeholder="قیمت"
            onChange={(e) => this.setState({ price: e.target.value })}
          />
          <input type="file" onChange={(e) => this.setState({ picture: e.target.files[0] })} />
          <button type="submit">ذخیره</button>
        </form>
      </div>
    );
  }
}
