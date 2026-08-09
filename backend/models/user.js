const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({
name : {type:String, required:true},
favorites : {type:[String]},
books: {type:[mongoose.Schema.Types.ObjectId],ref:'Book'},
email : {type:String,required :true,unique:true},
password: {type:String,required:true},
date: {type:Date, default: Date.now()},
admin : {type:Boolean,default:false},
resetCode:String,
codeExpiry:String,
resetToken:String
});
//schema.plugin(timestamp);


const User = mongoose.model("user",schema);

module.exports = User;