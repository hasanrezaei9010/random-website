const expressValidator = require("express-validator");
const { check } = expressValidator;
const validator = require("validator");

module.exports = new (class {
  registerValidator() {
    //const {email,name,password} = req.body;
    return [
      check("email").isEmail().withMessage("invalid email").normalizeEmail(),
      check("name").not().isEmpty().withMessage("name cant be empty"),
      check("password").not().isEmpty().withMessage("password needed"),
    ];
  }
  loginValidator() {
    return [
      /* check("email").isEmail().withMessage("invalid email") */
      check("identifier")
        .notEmpty()
        .withMessage("email or username required")
        .custom((value) => {
          if (validator.isEmail(value)) {
            return true;
          } else {
            if (!validator.isLength(value, { min: 3 })) {
              throw new error("username must be at least 3 characters");
            }
            if (!validator.isAlphanumeric(value, "en-US", { ignore: "_" })) {
              throw new error(
                "username can only contain letters,numbers and underscore",
              );
            }
            return true;
          }
        }),
      check("password").notEmpty().withMessage("password needed")
      .isLength({min:3}).withMessage("password must at least contain 3 characters")
    ];
  }
})();
