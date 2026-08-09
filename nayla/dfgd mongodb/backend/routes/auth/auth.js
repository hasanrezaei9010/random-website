const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validate.js");

router.post(
  "/register",

  validator.registerValidator(),
  controller.validate,
  (req, res, next) => controller.register(req, res, next),
);

router.post(
  "/login",
  validator.loginValidator(),
  controller.validate,
  controller.login,
);

module.exports = router;
