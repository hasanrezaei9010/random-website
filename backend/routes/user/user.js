const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/recieve",
    controller.fetchUser
);


module.exports = router;