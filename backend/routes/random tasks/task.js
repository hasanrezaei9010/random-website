const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const authenticated = require('../../middlewares/authenticated');

router.post("/captcha",
    controller.captcha
);

router.post("/authorization",
    controller.authorization
);

router.post("/recovery",
    controller.passRecovery
);

router.post("/verify",
    controller.passVerify
);

router.get('/notification', authenticated, controller.getNotifications);



module.exports = router;