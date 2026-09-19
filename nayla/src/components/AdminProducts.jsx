import React, { Component } from "react";
import {toast} from 'react-toastify';

export default class AdminProducts extends Component {
  state = { products: [], updatedProduct: {name:'',picture:'',description:'',price:''} };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    fetch("http://localhost:5000/api/admin/all")
      .then((res) => res.json())
      .then((data) => this.setState({ products: data.data }));
  };

  handleDelete = async (id) => {
    try {
     if (!window.confirm("مطمئنی؟")) return;
    const response = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
      method: "DELETE",
    });
    const data = response.json();
    if (data.ok) {
      toast.success('با موفقیت حذف شد')
       this.fetchProducts();
    } else {
      console.log(data)
      toast.error('خطایی رخ داده')
    }
   } catch (error) {
    console.error(error)
    toast.error('خطا در برقراری ارتباط')
   }
   
  };

  handleUpdate = async (id) => {
   try {
     const response = await fetch(`http://localhost:5000/api/admin/update/${id}`, {
      method: "PUT",
      body:JSON.stringify(product = this.state.updatedProduct)
    });
    const data = response.json();
    if (data.ok) {
      toast.success('با موفقیت آپدیت شد')
       this.fetchProducts();
    } else {
      console.log(data)
      toast.error('خطایی رخ داده')
    }
   } catch (error) {
    console.error(error)
    toast.error('خطا در برقراری ارتباط')
   }
   
  };

  render() {
    return (
      <div>
        <h2>مدیریت محصولات</h2>
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
                  <button onClick={() => this.handleDelete(p._id)}>حذف</button>
                  <button popoverTarget="update-product" popoverTargetAction="show">
                    ویرایش
                  </button>
                </td>
                <dialog id="update-product" popover="manual">
                  <input onChange={(e) => this.setState(prevState => ({...prevState.updatedProduct ,name : e.target.value}))} type="text" name="" id="" />
                  <input onChange={(e) => this.setState(prevState => ({...prevState.updatedProduct ,picture : e.target.value}))} type="file" name="" id="" />
                  <input onChange={(e) => this.setState(prevState => ({...prevState.updatedProduct ,description : e.target.value}))} type="text" name="" id="" />
                  <input onChange={(e) => this.setState(prevState => ({...prevState.updatedProduct ,price : e.target.value}))} type="number" name="" id="" />
                  <button onClick={() => this.handleUpdate(p._id)}>ارسال</button>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
