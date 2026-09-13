const mongoose = require("mongoose");

const schema = new mongoose.Schema({
product:{type:mongoose.Schema.Types.ObjectId,ref:'Product' ,required:true},
quantity:{type:Number,default:1,required:true},
price:{type:Number,required:true},
data:{type:Date,default:Date.now(),required:true}
});

const Order = new mongoose.model('order',schema);

module.exports = Order;