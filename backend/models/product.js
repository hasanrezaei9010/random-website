const mongoose = require("mongoose");

const schema = new mongoose.Schema({
name:{type:String ,required:true},
picture:{type:String,required:true},
description:{type:String,required:true},
price:{type:String,required:true}
});

const Product = mongoose.model('Product',schema);

module.exports = Product;