const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/deliever/:id",
    () => console.log('reaches here'),
    controller.fetchProduct
);

router.get("/recieve",
    controller.fetchProducts
);

module.exports = router;