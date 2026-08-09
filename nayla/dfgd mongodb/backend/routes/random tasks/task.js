const express = require("express");
const router = express.Router();
const controller = require("./controller.js");


router.post("/captcha", 
    controller.captcha
);

router.post("/test", 
    (req,res)=>res.send("reached here")
)
router.post("/authorization", 
    controller.authorization
);

router.post("/recovery", 
    controller.passRecovery
);

router.post("/verify", 
    controller.passVerify
);

module.exports = router;