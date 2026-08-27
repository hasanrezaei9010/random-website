const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

/* router.post("/deliever",
    controller.passVerify
); */

router.get("/recieve",
    controller.fetchProduct
);

module.exports = router;