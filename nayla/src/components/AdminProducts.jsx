import React, { Component } from "react";
import { toast } from "react-toastify";
import "../css/admin-products.css";

export default class AdminProducts extends Component {
  state = {
    products: [],
    updatedProduct: {},
    search: "",
    updatedProductId: null,
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
        console.log(data);
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
        toast.error(data.message);
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
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  };

  render() {
    const filtered = this.state.products.filter((p) =>
      p.name.toLowerCase().includes(this.state.search.toLowerCase()),
    ) || this.state.products ;
    return (
      <div className="admin-products">
        <h2>مدیریت محصولات</h2>
        <div className="table-wrapper">
          <input
            type="search"
            onChange={(e) => this.setState({ search: e.target.value })}
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
                          updatedProductId: p._id,
                          updatedProduct: { ...p },
                        });
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
            onChange={(e) =>
              this.setState((prevState) => ({
                updatedProduct: {
                  ...prevState.updatedProduct,
                  name: e.target.value,
                },
              }))
            }
            type="text"
            name="name"
            value={this.state.updatedProduct.name}
            placeholder="نام محصول"
          />
          <input
            onChange={(e) =>
              this.setState((prevState) => ({
                updatedProduct: {
                  ...prevState.updatedProduct,
                  picture: e.target.files[0],
                },
              }))
            }
            type="file"
            name="picture"
            value={this.state.updatedProduct.picture}
            placeholder="تصویر محصول را بارگذاری کنید"
          />
          <input
            onChange={(e) =>
              this.setState((prevState) => ({
                updatedProduct: {
                  ...prevState.updatedProduct,
                  description: e.target.value,
                },
              }))
            }
            type="text"
            name="description"
            value={this.state.updatedProduct.description}
            placeholder="توضیحات محصول"
          />
          <input
            onChange={(e) =>
              this.setState((prevState) => ({
                updatedProduct: {
                  ...prevState.updatedProduct,
                  price: e.target.value,
                },
              }))
            }
            type="number"
            name="price"
            value={this.state.updatedProduct.price}
            placeholder="قیمت محصول"
          />
          <button
            onClick={() => this.handleUpdate(this.state.updatedProductId)}
          >
            ارسال
          </button>
        </dialog>
      </div>
    );
  }
}
