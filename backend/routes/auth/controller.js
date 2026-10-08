const controller = require("../controller");
const User = require("./../../models/user.js");
const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
  async register(req, res) {
    try {
      let user = await this.User.findOne({ email: req.body.email });
      if (user) {
        return this.response({
          res,
          message: "user already exists",
          code: 201,
          data: user,
        });
      }

      const { name, email, password } = req.body;
      user = new this.User({
        email,
        name,
        password /* _.pick(req.body,['name','email','password']) */,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt); //وقتی کاربر هنوز تو دیتابیس نیست و تو رمه برا چی باس اویت بذاریم
      await user.save();
      const token = jwt.sign({ _id: user.id }, config.get("jwt"));
      this.response({
        res,
        message: "user registered successfully",
        data:{ token ,
          user: { _id: user._id, name: user.name, email: user.email, admin: user.admin }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const isEmail = req.body.identifier.includes("@");
      let identifier = [];
      if (isEmail) {
        identifier.push({ email: req.body.identifier });
      } else {
        identifier.push({ name: req.body.identifier });
      }
      const user = await this.User.findOne(identifier[0]);
      if (!user) {
        this.response({
          res,
          code: 400,
          message: "couldnt find user",
        });
      }
      console.log(user,req.body.password,await bcrypt.compare(req.body.password ,user.password))
      const isvalid = await bcrypt.compare(req.body.password ,user.password); //مگه رمز کاربر الان هش نشده پس باید رمز داخل ریکوئست ر هم هش کنیم تا بشه مقایسه کرد دیگه بله؟
      if (!isvalid) {
        return this.response({
          res,
          code: 400,
          message: "invalid email or password",
        });
      }
      const token = jwt.sign({ _id: user.id, admin: user.admin }, config.get("jwt"));
      this.response({
        res, code: 200,
        message: "logged in",
        data: {
          token,
          user: { _id: user._id, name: user.name, email: user.email, admin: user.admin }
        }
      });
    } catch (error) {
      console.log(error)
    }

  }
})();
