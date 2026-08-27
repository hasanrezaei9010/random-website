const controller = require("../controller.js");
const Product = require("../../models/product.js");

module.exports = new (class extends controller {
  async fetchProduct(req, res) {
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
     console.log(er)
    }}
 
})();
