const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // کاربر ثبت‌نام شده
  customer: {
    name: String,
    address: String,
    phone: String
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  paymentId: String, // شناسه پرداخت از درگاه
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
