const controller = require("../controller.js");
const Order = require("../../models/order.js");
const Notification = require("../../models/notification.js");

module.exports = new (class extends controller {
  // متد ۱: ساخت سفارش و دریافت لینک پرداخت
  async createOrder(req, res) {
    try {
      const { customer, items, totalPrice } = req.body;

      // ۱. ساخت سفارش در دیتابیس
      const order = new Order({
        user: req.user?._id, // اگر لاگین کرده
        customer,
        items,
        totalPrice,
        status: 'pending'
      });
      await order.save();

      // ۲. اتصال به درگاه پرداخت (زرین‌پال، آیدی‌پی و...)
      const paymentResponse = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', {
        merchant_id: 'YOUR_MERCHANT_ID',
        amount: totalPrice,
        callback_url: 'http://localhost:3000/api/order/callback',
        description: `پرداخت سفارش ${order._id}`
      });

      if (paymentResponse.data.data.code === 100) {
        order.paymentId = paymentResponse.data.data.authority;
        await order.save();

        res.json({
          success: true,
          paymentUrl: `https://www.zarinpal.com/pg/StartPay/${paymentResponse.data.data.authority}`
        });
      } else {
        res.status(400).json({ error: 'خطا در اتصال به درگاه' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  // متد ۲: بازگشت از درگاه (Callback)
  async verifyPayment(req, res) {
    const { Authority, Status } = req.query;
    try {
      if (Status !== 'OK') {
        return res.redirect('http://localhost:3000/payment/failed');
      }

      const order = await Order.findOne({ paymentId: Authority });
      if (!order) return res.status(404).json({ error: 'سفارش یافت نشد' });

      const verifyResponse = await axios.post('https://api.zarinpal.com/pg/v4/payment/verify.json', {
        merchant_id: 'YOUR_MERCHANT_ID',
        amount: order.totalPrice,
        authority: Authority
      });

      if (verifyResponse.data.data.code === 100) {
        order.status = 'paid';
        await order.save();
        res.redirect(`http://localhost:3000/payment/success/${order._id}`);

      } else {
        res.redirect('http://localhost:3000/payment/failed');
      }
    } catch (error) {
      console.error(error.message)
    }

  }

  async allOrders(req, res) {
    try {
      const orders = await Order.find();
      if (orders) {
        res.json({ data: orders });
      } else {
        res.status(401).json({ message: 'سفارشی یافت نشد' })
      }
    } catch (error) {
     console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await Order.find({ user: req.user._id }).populate('items.product');
      if (orders) {
        res.json({ data: orders });
      } else {
        res.status(401).json({ message: 'سفارشی یافت نشد' })
      }
    } catch (error) {
     console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }
  }

  async getUsersOrders(req, res) {
    try {
      const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ date: -1 });
    res.json({ data: orders });
    } catch (error) {
      console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }
    
  }

  async updateOrder(req, res) {
    const { status } = req.body;
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.status = status;
        order.save();
        res.json({ messgae: 'updated successfully', data: order });
      } else {
        this.response({ res, code: 401, message: 'order was not found' })
      }
    } catch (error) {
      console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }

  }

})();
