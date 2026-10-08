const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/loggedadmin/:id",
    controller.loggedAdmin
);
router.put("/edit",
    controller.editProfile
);
router.get("/admin",
    controller.fetchAdmin
);


module.exports = router;