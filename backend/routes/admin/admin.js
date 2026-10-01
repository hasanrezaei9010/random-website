const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const {body} = require("express-validator");


//endpoint related to PRODUCTS
router.get('/all',
    controller.getAllProducts
);

router.post('/add',[
 body('name').isLength({min :3}).withMessage('نام باید حداقل دارای سه حرف باشد'),
 body('price').isNumeric().withMessage('قیمت باید به عدد باشد'),
 body('price').custom(value => value > 0).withMessage('قیمت باید مثبت باشد')
],
    controller.addProduct
);

router.delete('/delete/:id',
    controller.deleteProduct
);

router.put('/update/:id',
    controller.updateProduct
);

//endpoints related to USERS

router.put('/add',
    controller.addAdmin
);

router.put('/remove/:id',
    controller.removeAdmin
);

//endpoints related to ORDERS

router.get('/weekly-sales',
    controller.getWeeklySales
);

module.exports = router;