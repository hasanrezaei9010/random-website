import React, { Component } from 'react';
import {toast} from 'react-toastify';

export default class UploadProduct extends Component {
  state = { name: '', price: '', picture: null };

  handleFile = (e) => {
    this.setState({ picture: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('picture', this.state.picture);

    await fetch('http://localhost:5000/api/admin/add', {
      method: 'POST',
      headers :{ "x-auth-token": localStorage.getItem("token")},
      body: formData
    });
    toast.success('محصول اضافه شد');
  };
  handleInput = async (e,field) => {
    this.setState({ [field]: e.target.value })
  };

  render() {
    return (
      <>
      <h2>بارگذاری محصول</h2>
      <form onSubmit={this.handleSubmit} className='UPLOAD-PRODUCT-FORM'>
        <input placeholder="نام" onChange={(e) => this.handleInput(e,'name')} />
        <input placeholder="قیمت" onChange={(e) => this.handleInput(e,'price')} />
        <input type="file" onChange={this.handleFile} />
        <button type="submit">ذخیره</button>
      </form>
      </>
    );
  }
}
