const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/recieve",
    controller.fetchUser
);
router.get("/edit",
    controller.editProfile
);


module.exports = router;