//require("express-async-errors");
const express = require("express");
const router = express.Router();
const auth = require("./auth/auth.js");
const authenticated = require("./../middlewares/authenticated.js");
const error = require("../middlewares/error.js");
const isAdmin = require("../middlewares/isAdmin.js");
const user = require("./user/user.js");
const task = require("./random tasks/task.js");
const product = require("./product/product.js");
const order = require("./order/order.js");
const admin = require("./admin/admin.js");

router.use("/admin",authenticated ,isAdmin, admin);
router.use("/auth", auth);
router.use("/order", order);
router.use('/product',product);
router.use('/task',task);
router.use('/user',user);
router.use(error);

module.exports = router;
