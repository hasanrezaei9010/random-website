const controller = require("../controller");
const Product = require("../../models/product.js");
const Order = require("../../models/order.js");
const User = require("../../models/user.js");
const _ = require('lodash');
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

module.exports = new (class extends controller {
  //methods related to PRODUCTS
  // گرفتن همه محصولات
  async getAllProducts(req, res) {
    try {
      const cached = cache.get('products');
      if (cached) return res.json({ data: cached });

      const products = await Product.find();
      if (products) {
        cache.set('products', products);
        res.json({ message: 'products sent succesfully', data: products });
      } else {
        console.log('can not find any product')
        res.json({ message: 'can not find any product' })
      }

    } catch (error) {
      console.error(error)
    }
  }

  // اضافه کردن محصول
  async addProduct(req, res) {
    try {
      const { name, price, description, picture } = req.body;
      const product = new Product({ name, price, description, picture });
      await product.save();
      res.status(201).json({ data: product });
    } catch (error) {
      console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }

  }

  // حذف محصول
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (product) {
        res.json({ message: 'محصول حذف شد' });
      } else {
        this.response({ res, code: 401, message: "محصول یافت نشد" })
      }
    } catch (error) {
      console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }
  }

  // ویرایش محصول
  async updateProduct(req, res) {
    try {
      const { name, picture, description, price } = req.body.product;
      const product = await Product.findById(req.params.id);
      if (name) product.name = name;
      if (picture) product.picture = picture;
      if (description) product.description = description;
      if (price) product.price = price;
      product.save()
      res.json({ message: 'محصول با موفقیت به روز شد', data: product });
    } catch (error) {
      console.error(error)
      const err = new Error('مشکل داخلی سرور');
      err.status = 500;
      throw err
    }
  }

  //methods related to USERS

  async removeAdmin(req, res) {
    try {
      const { id } = req.params;
      const admin = await User.findByIdAndUpdate(id, { admin: false });
      if (admin) {
        this.response({ res, code: 200, message: "user updated successfully" });
        console.log(admin)
      } else {
        console.log('invalid user data');
        this.reponse({ res, code: 401, message: 'invalid data' });
      }
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async addAdmin(req, res) {
    try {
      let user;
      const { identifier } = req.body;
      if (identifier.includes('@')) {
        user = await User.findOne({ email: identifier });
      } else {
        user = await User.findOne({ name: identifier });
      }
      if (user) {
        user.admin = true;
        await user.save();
        this.response({ res, code: 200, message: "user updated successfully" });
      } else {
        console.log('invalid user data');
        this.reponse({ res, code: 401, message: 'invalid data' });
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //methods related to ORDERS

  async getWeeklySales(req, res) {
    try {
      // ۷ روز گذشته
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const sales = await Order.aggregate([
        // ۱. فقط سفارش‌های ۷ روز گذشته
        { $match: { date: { $gte: sevenDaysAgo } } },

        // ۲. گروه‌بندی بر اساس روز
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" }
            },
            totalSales: { $sum: "$totalPrice" }
          }
        },

        // ۳. مرتب‌سازی بر اساس تاریخ
        { $sort: { _id: 1 } }
      ]);

      // تبدیل به فرمت چارت
      const dayNames = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];

      const chartData = sales.map(item => {
        const date = new Date(item._id);
        const dayIndex = date.getDay(); // 0 = یکشنبه, 6 = شنبه
        return {
          name: dayNames[dayIndex],
          sales: item.totalSales
        };
      });

      this.response({
        res, code: 200,
        message: 'weekly sales sent',
        data: chartData
      });
    } catch (error) {
      this.response({ res, code: 500, message: error.message });
    }
  }


})();