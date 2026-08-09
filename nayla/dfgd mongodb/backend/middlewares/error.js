<<<<<<< HEAD
/* const winston = require("winston"); */

async function errors(error,req,res,next){
  /*   winston.error(error.message,error); */
    next()
}
=======
/* const winston = require("winston"); */

async function errors(error,req,res,next){
  /*   winston.error(error.message,error); */
    next()
}
>>>>>>> 4cbd5ec95e9b515aaf66928b6d6bde10e11a920f
module.exports = errors;