import React, { Component } from "react";
import {Link} from 'react-router-dom';
import '../css/cart.css';

export default class Cart extends Component {
  state = {
    cart: JSON.parse(sessionStorage.getItem('cart')) || []
  };

  removeItem = (id) => {
    const newCart = this.state.cart.filter(item => item._id !== id);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
  };

  getTotal = () => {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  goToCheckout = () => {
    this.props.navigate('/checkout');
  };

  render() {
    return (
      <div className="cart-page">
        <h2>سبد خرید</h2>
        {this.state.cart.length === 0 ? (
          <p className="cart-empty-text">سبد خرید خالی است</p>
        ) : (
          <>
            {this.state.cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={`http://localhost:5000${item.picture}`} alt={item.name} />
                <h4>{item.name}</h4>
                <span>{item.quantity} عدد</span>
                <span>{item.price * item.quantity} تومان</span>
                <button onClick={() => this.removeItem(item._id)}>حذف</button>
              </div>
            ))}
            <div className="total">جمع کل: {this.getTotal()} تومان</div>
            <Link 
            className="checkout-link"
            to={'/checkout'}>ادامه و پرداخت</Link>
          </>
        )}
      </div>
    );
  }
}
