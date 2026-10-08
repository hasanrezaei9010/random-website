const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/deliever/:id",
    controller.fetchProduct
);

router.get("/recieve",
    controller.fetchProducts
);

module.exports = router;