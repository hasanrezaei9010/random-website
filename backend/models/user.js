const mongoose = require('mongoose');

const schema = new mongoose.Schema({
name : {type:String, required:true,unique:true},
orders: [{type:[mongoose.Schema.Types.ObjectId],ref:'Order'}],
email : {type:String,required :true,unique:true},
password: {type:String,required:true},
date: {type:Date, default: Date.now},
admin : {type:Boolean},
picture : {type:String,required:function(){
    return this.admin === true;
}},
resetCode:String,
codeExpiry:String,
resetToken:String
});


const User = mongoose.model("user",schema);

module.exports = User;