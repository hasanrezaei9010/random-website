const controller = require("../controller");
const User = require("./../../models/user.js");
const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
  async register(req, res, next) {
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
      const token = jwt.sign({ id: user.id }, config.get("jwt"));
      this.response({
        res,
        message: "user registered successfully",
        data: token /* _.pick(user, ["_id", "name", "email"]) */,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const isEmail = req.body.identifier.includes("@");
      let identifier = [];
      if (isEmail) {
        identifier.push({ email: req.body.identifier });
      } else {
        identifier.push({ name: req.body.identifier });
      }
      const user = await this.User.findOne().or(identifier);
      if (!user) {
        this.response({
          res,
          code: 400,
          message: "invalid username or password",
        });
      }
      const isvalid = await bcrypt.compare(req.body.password, user.password); //مگه رمز کاربر الان هش نشده پس باید رمز داخل ریکوئست ر هم هش کنیم تا بشه مقایسه کرد دیگه بله؟
      if (!isvalid) {
        return this.response({
          res,
          code: 400,
          message: "invalid email or cash",
        });
      }
      const token = jwt.sign({ id: user.id }, config.get("jwt"));
      this.response({ res, code: 200, message: "logged in", data: token });
    } catch (error) {
      console.log(error)
    }

  }
})();
