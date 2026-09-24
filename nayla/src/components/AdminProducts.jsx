import React, { Component } from "react";
import { toast } from "react-toastify";
import '../css/admin-products.css';

export default class AdminProducts extends Component {
  state = {
    products: [],
    updatedProduct: { name: "", picture: "", description: "", price: "" },
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
          headers : {"x-auth-token" : localStorage.getItem('token')},
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

  render() {
    return (
      <div className="admin-products">
        <h2>مدیریت محصولات</h2>
        <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>نام</th>
              <th>قیمت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((p) => (
              <tr key={p._id}>
                <td>{p.picture}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <button className="btn-delete" onClick={() => this.handleDelete(p._id)}>حذف</button>
                  <button
                  className="btn-edit"
                    popoverTarget="update-product"
                    popoverTargetAction="show"
                  >
                    ویرایش
                  </button>
                </td>
                <dialog id="update-product" className="update-popover" popover="manual">
                  <input
                    onChange={(e) =>
                      this.setState((prevState) => ({
                        ...prevState.updatedProduct,
                        name: e.target.value,
                      }))
                    }
                    type="text"
                    name=""
                    id=""
                  />
                  <input
                    onChange={(e) =>
                      this.setState((prevState) => ({
                        ...prevState.updatedProduct,
                        picture: e.target.value,
                      }))
                    }
                    type="file"
                    name=""
                    id=""
                  />
                  <input
                    onChange={(e) =>
                      this.setState((prevState) => ({
                        ...prevState.updatedProduct,
                        description: e.target.value,
                      }))
                    }
                    type="text"
                    name=""
                    id=""
                  />
                  <input
                    onChange={(e) =>
                      this.setState((prevState) => ({
                        ...prevState.updatedProduct,
                        price: e.target.value,
                      }))
                    }
                    type="number"
                    name=""
                    id=""
                  />
                  <button onClick={() => this.handleUpdate(p._id)}>
                    ارسال
                  </button>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
