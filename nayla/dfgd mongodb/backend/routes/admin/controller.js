const controller = require("../controller");
const User = require("./../models/user");
const _ = require('lodash');
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller{
async register(req,res){
    let user = await User.findOne({email:req.body.email});
    if(user){
        return this.response({res,message:'user already exists',code:201,data:user})
    }
 user = new this.User(_.pick(req.body,['name','email','password']));
 const salt = await bcrypt.genSalt(10);
 user.password =  await bcrypt.hash(user.password,salt); //وقتی کاربر هنوز تو دیتابیس نیست و تو رمه برا چی باس اویت بذاریم

 await user.save();
 this.response({res,
    message:'user registered successfully',
    data:_.pick(user,["_id","name","email"])});
}

async login(req,res){
    const user = await User.findOne({email:req.body.email});
    if(!user){
        this.response({res,code:400,message:"invalid email or password"})
    }
    const isvalid = await bcrypt.compare(user.password,req.body.password); //مگه رمز کاربر الان هش نشده پس باید رمز داخل ریکوئست ر هم هش کنیم تا بشه مقایسه کرد دیگه بله؟
if (!isvalid){
    return this.response({res,code:400,message:"invalid email or password"})
}
const token = jwt.sign({_id:user.id},config.get("jwt"));
this.response({res,message:"logged in",data:token})

}

})();