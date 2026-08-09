const controller = require("../controller.js");
const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/user.js");

module.exports = new (class extends controller {
  async captcha(req, res) {
    try {
      const token = req.body.token;
      const response = await fetch("", {
        method: "POST",
        headers: {},
        body: JSON.stringify(token),
      });

      if (response.ok) {
        res.status(200).json({ message: "successfull" });
      } else {
        res.status(200).json({ message: "unsuccessfull" });
      }
    } catch (er) {
      res.status(500).send("its here");
    }
  }

  authorization(req, res) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, config.get("jwt"));
      if (!decoded) {
        res.status(401).json({ message: "failed" });
      }
    } catch {
      res.status(200).json({ message: "invalid token" });
    }
  }

  async passRecovery(req, res) {
    try {
      const email = req.body.email.trim().toLowerCase();
      let user = await this.User.findOne({ email });

      if (!user)
        return this.response({ res, code: 404, message: "کاربر پیدا نشد" });
      const resetCode = crypto.randomInt(1000, 9999).toString();
      const token = crypto.randomBytes(32).toString("hex");
      user.resetCode = resetCode;
      user.codeExpiry = Date.now() + 600000;
      user.resetToken = token;
      await user.save();


      res.cookie("resetToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 300000,
        sameSite: "lax",
      });sdfdfs

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email || "hassanr616263@gmail",
          pass: process.env.email_pass,
        },
      });
      console.log(process.env.email, process.env.email_pass);
      await transporter.sendMail({
        from: process.env.email || "hassanr616263@gmail",
        to: email,
        subject: "کد بازیابی رمز عبور",
        html: `<p>کد تایید شما:</p><h1>${resetCode}</h1><p>این کد 5 دقیقه اغتبار دارد</p>`,
      });

      this.response({ res, message: "کد به ایمیل شما ارسال شد" });
    } catch (error) {
      console.log(error);
      res.json({ message: ["here ", error.message] });
    }
  }

  async passVerify(req, res) {
    try {
    const { resetCode } = req.body;
    const {resetToken} = req.cookies;

    if (!resetToken) this.response({ res, message: "کاربر شناسایی نشد" });
    const user = await this.User.findOne({ resetToken });
    if (!user) return res.status(400).json({ message: "درخواست نامعتبر" });
    if (user.resetCode !== resetCode)
      return res.status(400).json({ message: "کد اشتباه است" });
    if (Date.now() > user.codeExpiry) {
      user.codeExpiry = "";
      return res.status(400).json({ message: "کد منقضی شده" });
    }

    this.response({ res, message: "کد تایید شد" });
    } catch (error) {
      response({res,code:500,message:"something went wrong"})
      console.log(error)
    }
    
  }

})();
