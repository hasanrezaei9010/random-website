const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const routes = require("./routes/route.js");
const debug = require("debug")("clash");
const config = require("config");
const winston = require("winston");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("./models/user.js");
const Product = require("./models/product.js");
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const expressListEndpoints = require("express-list-endpoints");
const errorHandler = require('./middlewares/error.js');
const helmet = require('helmet');
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100,
    message : 'تعداد درخواست های شما بیش از حد مجاز است لطفا بعدا تلاش بکنید.'
});
const loginLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 5,
    message : 'تعداد تلاش برای ورود بیش از حد مجاز است لطفا بعد از 15 دقیقه تلاش کنید.'
});

app.use(helmet());
app.use('../nayla/public', express.static('../nayla/public'));
app.use(cors({origin:['http://localhost:3001']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/api',limiter);
app.use('/api/auth/login',loginLimiter);
app.use(compression());
app.use('/api', routes);
app.use(errorHandler);

const endpoints = expressListEndpoints(app);


mongoose.connect('mongodb://localhost:27017/Nayla')
    .then(() => console.log('connected'))
    .catch(() => console.log('couldnt connect'));


/* const logger = winston.createLogger({
    level:"info",
    format: winston.format.json(),
   transports:[
    new winston.trasnports.File({filename:"logfile.log"})
] 
});
winston.add(logger,transports[0]);
logger.add(new winston.transports.Console({format:winston.format.simple()}))
logger.info("tetsing") */

process.on("uncaughtException",(ex)=>{
    debug("an uncaughtException has occured");
    /* logger.info(ex.message); */
    console.log('uncaughtException has occured : ',ex.message);
    process.exit(1);
})

process.on("unhandledRejection",(ex)=>{
    debug("an unhandledRejection has occured");
    /* logger.info(ex.message); */
    console.log('unhandledRejection has occured : ',ex.message)
    process.exit(1);
})

app.listen(port, () => { console.log(`running on port ${port}`) });

