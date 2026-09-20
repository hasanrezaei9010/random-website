const winston = require("winston"); */

async function errors(error,req,res,next){
  winston.error(error.message,error);
  console.error(error.stack);
  res.status(error.status || 500).json({
    success : false,
    message : error.message || 'خطای داخلی سرور',
    ...(process.env.NODE_ENV === 'production' && {stack : error.stack})
  })
    next()
}
module.exports = errors;