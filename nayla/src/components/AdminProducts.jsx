import React, { Component } from "react";
import { toast } from "react-toastify";
import "../css/admin-products.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default class AdminProducts extends Component {
  state = {
    products: [],
    updatedProduct: {},
    originalProduct: {},
    search: "",
    updatedProductId: null,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/all`, {
        headers: { "x-auth-token": sessionStorage.getItem("token") },
      });
      const data = await response.json();

      if (response.ok) {
        this.setState({ products: data.data });
      } else {
        toast.error("خطایی رخ داده")
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  handleDelete = async (id) => {
    try {
      if (!window.confirm("مطمئنی؟")) return;
      const response = await fetch(
        `${API_URL}/api/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: { "x-auth-token": sessionStorage.getItem("token") },
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("با موفقیت حذف شد");
        this.fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در برقراری ارتباط");
    }
  };

  handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      const product = this.state.updatedProduct;
      const original = this.state.originalProduct;

      if(product.name && product.name !== original.name) formData.append("name",product.name);
      if(product.description && product.description !== original.description) formData.append("description",product.description);
      if(product.price && product.price !== original.price) formData.append("price",product.price);
      if(product.picture instanceof File) formData.append("picture",product.picture);

      const response = await fetch(
        `${API_URL}/api/admin/update/${id}`,
        {
          method: "PUT",
          headers: { "x-auth-token": sessionStorage.getItem("token") },
          body: formData,
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("با موفقیت آپدیت شد");
        this.fetchProducts();
      } else {
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
                  <td>
                    <img src={p.product ? `${API_URL}${p.picture}` : ""}
                   alt={p.name} 
                   style={{width:50 , height:50,objectFit:"cover"}}
                   />
                   </td>
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
                          originalProduct: { ...p }
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
          <button
            id="close-notif"
            popoverTargetAction="hide"
            popoverTarget="update-product"
          >
            ×
          </button>
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
