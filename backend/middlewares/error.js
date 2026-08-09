/* const winston = require("winston"); */

async function errors(error,req,res,next){
  /*   winston.error(error.message,error); */
    next()
}
module.exports = errors;