const controller = require("../controller.js");
const Product = require("../../models/product.js");

module.exports = new (class extends controller {
  async fetchProducts(req, res) {
    try {
      const products = await Product.find();
      if (products) {
        this.response({
          res,
          code:200,
          message:"products sent successfully",
          data:products
        })
      } else {
        this.response({
          res,
          code:500,
          message:"couldnt find the requested products",
        })
      }
    } catch (er) {
     console.error(er)
    }}
  async fetchProduct(req, res) {
    try {
      const product = await Product.findOne(req.params.id);
      if (product) {
        this.response({
          res,
          code:200,
          message:"products sent successfully",
          data:product
        })
      } else {
        this.response({
          res,
          code:500,
          message:"couldnt find the requested product",
        })
      }
    } catch (er) {
     console.error(er)
    }}
 
})();
