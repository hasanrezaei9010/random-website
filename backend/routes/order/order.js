const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const authenticated = require("../../middlewares/authenticated.js");

router.post("/create",
    controller.createOrder
);
router.get("/callback",
    authenticated,
    controller.verifyPayment
);
router.get("/user-orders",
    controller.getUserOrders
);
router.get("/my-orders",
    controller.getUsersOrders
);

router.get("/all",
    controller.allOrders
);

router.put('/update/:id',
    controller.updateOrder
);

module.exports = router;