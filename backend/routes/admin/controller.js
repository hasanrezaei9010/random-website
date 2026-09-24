const controller = require("../controller");
const Product = require("../../models/product.js");
const _ = require('lodash');
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

module.exports = new (class extends controller {
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
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'محصول حذف شد' });
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


})();