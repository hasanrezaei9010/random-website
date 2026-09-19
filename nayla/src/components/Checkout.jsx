import React, { Component } from "react";
import {toast} from 'react-toastify';

export default class Checkout extends Component {
  state = {
    name: '',
    address: '',
    phone: '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customer: {
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone
      },
      items: this.state.cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: this.state.cart.reduce((s, i) => s + (i.price * i.quantity), 0)
    };
       
    try {
      // ارسال به بک‌اند برای ساخت سفارش و دریافت لینک پرداخت
    const response = await fetch('http://localhost:5000/api/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (data.paymentUrl) {
      // هدایت کاربر به درگاه پرداخت
      window.location.href = data.paymentUrl;
      toast.info('انتقال به درگاه پرداخت')
    }else{
      toast.error('خطا در اتصال به درگاه پرداخت')
    }
    } catch (error) {
      console.error(error)
      toast.error('خطا در برقراری ارتیاط با سرور')
    }
    
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="checkout-form">
        <h2>اطلاعات ارسال</h2>
        <input 
          placeholder="نام و نام خانوادگی" 
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} 
          required 
        />
        <input 
          placeholder="آدرس" 
          value={this.state.address}
          onChange={e => this.setState({ address: e.target.value })} 
          required 
        />
        <input 
          placeholder="شماره تماس" 
          value={this.state.phone}
          onChange={e => this.setState({ phone: e.target.value })} 
          required 
        />
        <div className="total">مبلغ قابل پرداخت: {this.state.cart.reduce((s, i) => s + (i.price * i.quantity), 0)} تومان</div>
        <button type="submit">پرداخت</button>
      </form>
    );
  }
}
