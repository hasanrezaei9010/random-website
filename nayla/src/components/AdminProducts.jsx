import React, { Component } from "react";
import { toast } from "react-toastify";
import "../css/admin-products.css";

export default class AdminProducts extends Component {
  state = {
    products: [],
    updatedProduct: { name: "", picture: "", description: "", price: "" },
    search: "",
    updatedProductId: null
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/all", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = await response.json();

      if (response.ok) {
        this.setState({ products: data.data });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = async (id) => {
    try {
      if (!window.confirm("مطمئنی؟")) return;
      const response = await fetch(
        `http://localhost:5000/api/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: { "x-auth-token": localStorage.getItem("token") },
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("با موفقیت حذف شد");
        this.fetchProducts();
      } else {
        console.log(data);
        toast.error("خطایی رخ داده");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  };

  handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/update/${id}`,
        {
          method: "PUT",
          headers: { "x-auth-token": localStorage.getItem("token") },
          body: JSON.stringify((product = this.state.updatedProduct)),
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("با موفقیت آپدیت شد");
        this.fetchProducts();
      } else {
        console.log(data);
        toast.error("خطایی رخ داده");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  };

  handleSearch = async (e) => {
    this.setState({ search: e.target.value });
  };

  handleSomething = async (e, field) => {
    this.setState((prevState) => ({
      ...prevState.updatedProduct,
      [field]: e.target.value,
    }));
  };

  handleFilething = async (e, field) => {
    this.setState((prevState) => ({
      ...prevState.updatedProduct,
      [field]: e.target.files[0],
    }));
  };

  render() {
    const filtered = this.state.products.filter((p) =>
      p.name.toLowerCase().includes(this.state.search.toLowerCase()),
    );
    return (
      <div className="admin-products">
        <h2>مدیریت محصولات</h2>
        <div className="table-wrapper">
          <input
            type="search"
            onChange={(e) => this.handleSearch(e)}
            placeholder="جستجو"
          />
          <table>
            <thead>
              <tr>
                <th>نام</th>
                <th>قیمت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id}>
                  <td>{p.picture}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDelete(p._id)}
                    >
                      حذف
                    </button>
                    <button
                      className="btn-edit"
                      popoverTarget="update-product"
                      popoverTargetAction="show"
                      onClick={() => {
                        this.setState({
                          updatedProductId : p._id,
                          updatedProduct : {...p}
                        })
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dialog id="update-product" className="update-popover" popover="manual">
          <input
            onChange={(e) => this.handleSomethinElse(e, "name")}
            type="text"
            name="name"
            value={this.state.updatedProduct.name}
          />
          <input
            onChange={(e) => this.handleFilething(e, "picture")}
            type="file"
            name="picture"
            value={this.state.updatedProduct.picture}
          />
          <input
            onChange={(e) => this.handleSomething(e, "description")}
            type="text"
            name="description"
            value={this.state.updatedProduct.description}
          />
          <input
            onChange={(e) => this.handleSomething(e, "price")}
            type="number"
            name="price"
            value={this.state.updatedProduct.price}
          />
          <button onClick={() => this.handleUpdate(this.state.updatedProductId)}>ارسال</button>
        </dialog>
      </div>
    );
  }
}
