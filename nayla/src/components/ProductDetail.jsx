import React, { useEffect,useState } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import '../css/productdetail.css';

export default function ProductDetail() {
const [product,setProduct]=useState(null);
const [quantity,setQuantity]=useState(1);


  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(()=>{
    const passedProduct = location.state?.product || {};
    if (passedProduct) {
      setProduct(passedProduct);
    } else {
      fetch(`${API_URL}/api/product/deliever/:${id}`)
        .then(res => res.json())
        .then(data => setProduct(data.data ));
    }
  }
    ,[id,location.state])

  const addToCart = () => {
    // ذخیره در localStorage به عنوان سبد خرید ساده
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    const existingIndex = cart.findIndex(item => item._id === product._id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    toast.success('محصول به سبد خرید اضافه شد!');
    navigate('/cart');
  };

    if (!product) return <div>در حال بارگذاری...</div>;

    return (
      <div className="product-detail">
        <img src={`${API_URL}${product.picture}`} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span className="price">{product.price} تومان</span>
        
        <div className="quantity-selector">
          <button onClick={() => setQuantity(quantity => Math.max(1, quantity - 1) )}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity => quantity + 1 )}>+</button>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>
          افزودن به سبد خرید
        </button>
      </div>
    );
}