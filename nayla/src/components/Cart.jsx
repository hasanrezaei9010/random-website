import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class Cart extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
  };

  removeItem = (id) => {
    const newCart = this.state.cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
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
      <div className="cart">
        <h2>سبد خرید</h2>
        {this.state.cart.length === 0 ? (
          <p>سبد خرید خالی است</p>
        ) : (
          <>
            {this.state.cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.picture} alt={item.name} />
                <h4>{item.name}</h4>
                <span>{item.quantity} عدد</span>
                <span>{item.price * item.quantity} تومان</span>
                <button onClick={() => this.removeItem(item._id)}>حذف</button>
              </div>
            ))}
            <div className="total">جمع کل: {this.getTotal()} تومان</div>
            <Link 
            style={{all:'unset',backgroundColor:'white',font:'#b22234',border:'2px solid #b22234',padding:'5px',marginTop:'50px',borderRadius:'8px'}}
            to={'/checkout'}>ادامه و پرداخت</Link>
          </>
        )}
      </div>
    );
  }
}
