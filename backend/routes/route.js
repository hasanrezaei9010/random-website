//require("express-async-errors");
const express = require("express");
const router = express.Router();
const auth = require("./auth/auth.js");
const authenticated = require("./../middlewares/authenticated.js");
const error = require("./../middlewares/error.js");
const user = require("./user/user.js");
const task = require("./random tasks/task.js");
const product = require("./product/product.js");

router.use("/auth", auth);
router.use('/task',task);
router.use('/product',product);
router.use('/user',user);
router.use(error);

module.exports = router;
