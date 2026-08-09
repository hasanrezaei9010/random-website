//require("express-async-errors");
const express = require("express");
const router = express.Router();
const auth = require("./auth/auth.js");
const authenticated = require("./../middlewares/authenticated.js");
const error = require("./../middlewares/error.js");
const user = require("./user/user.js");
const config = require("config");
const jwt = require("jsonwebtoken");
const task = require("./random tasks/task.js");

router.use("/auth", auth);
router.use("/user", authenticated, user);
router.use('/task',task);
router.use(error);

module.exports = router;
