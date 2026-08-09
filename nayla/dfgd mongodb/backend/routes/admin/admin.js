const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const validator = require("./validator.js");


router.post('register',
    validator.registerValidator(),
    controller.validate,
    controller.register
);

router.post('login',
    validator.registerValidator(),
    controller.validate,
    controller.login
);

module.exports = router;