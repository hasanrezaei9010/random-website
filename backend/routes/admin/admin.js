const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const {body} = require("express-validator");

// product related routes
router.get('all',
    controller.getAllProducts
);
router.post('add',[
 body('name').isLength({min :3}).withMessage('نام باید حداقل دارای سه حرف باشد'),
 body('price').isNumeric().withMessage('قیمت باید به عدد باشد'),
 body('price').custom(value => value > 0).withMessage('قیمت باید مثبت باشد')
],
    controller.addProduct
);

router.put('update',
    controller.updateProduct
);

router.delete('delete',
    controller.deleteProduct
);

//order related routes

router.put('update',
    controller.updateProduct
);

module.exports = router;