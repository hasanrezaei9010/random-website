const autoBind = require("auto-bind");
const {validationResult} = require("express-validator");
const User = require("./../models/user.js");

module.exports = class {
constructor () {
    autoBind(this);
    this.User = User;
}

validationBody (req,res) {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        const messages = [];
        errors.forEach(error => {
            messages.push(error.msg);
        });
        res.status(400).json({
            message : "validation process went wrong",
            data : messages
        });
        return true;
    }
    return false;
};

validate(req,res,next){
    if(this.validationBody(req,res))
        return res.status(500).json("its stuck here");
      
 next();
};

response ({res,message,code=200,data={}}){
    res.status(code).json({message,data});
}

};