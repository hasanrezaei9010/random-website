const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const routes = require("./routes/route.js");
const debug = require("debug")("clash");
const config = require("config");
/* const winston = require("winston"); */
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("./models/user.js");
const Product = require("./models/product.js");

const expressListEndpoints = require("express-list-endpoints");

app.use('../nayla/public', express.static('../nayla/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api', routes);

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
logger.info("tetsing")

process.on("uncaughtException",(ex)=>{
    debug("an uncaughtException has occured");
    logger.info(ex.message);
    process.exit(1);
})
process.on("unhandledRejection",(ex)=>{
    debug("an unhandledRejection has occured");
    logger.info(ex.message);
    process.exit(1);
}) */

const kawazaki = new Product({
    name: 'هوندا CB400',
    picture: '../../public/motor1.jpg',
    description: '۴۰۰ سی‌سی • ۲۰۲۵',
    price: '۲۵۰M'
})
kawazaki.save()
const kawazaki2 = new Product({
    name: 'یاماها MT-07',
    picture: '../../public/motor2.jpg',
    description: '۷۰۰ سی‌سی • ۲۰۲۴',
    price: '۳۸۰M'
})
kawazaki2.save()
const kawazaki3 = new Product({
    name: 'دوکاتی پانیگاله',
    picture: '../../public/motor3.jpg',
    description: '۹۵۰ سی‌سی • ۲۰۲۵',
    price: '۶۵۰M'
})
kawazaki3.save()
const kawazaki4 = new Product({
    name: 'دوکاتی پانیگاله',
    picture: '../../public/motor1.jpg',
    description: '۹۵۰ سی‌سی • ۲۰۲۵',
    price: '۶۵۰M'
})
kawazaki4.save()
const kawazaki5 = new Product({
    name: 'دوکاتی پانیگاله',
    picture: '../../public/motor2.jpg',
    description: '۹۵۰ سی‌سی • ۲۰۲۵',
    price: '۶۵۰M'
})
kawazaki5.save()

/* const hasan =   new User({
name : 'hasan',
email : 'hasan@gmail.com',
password: 'hasan'
  })
hasan.save() */

console.log(endpoints)
app.listen(port, () => { console.log(`running on port ${port}`) });

