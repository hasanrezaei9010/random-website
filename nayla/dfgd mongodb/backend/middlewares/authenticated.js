<<<<<<< HEAD
const User = require("./../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");

async function authenticated (req,res,next){
const token = req.header("x-auth-token");
if(!token){
    res.status(401).send("access denied");
}
try {
  const decoded = jwt.verify(token,config.get("jwt"));
  const user = await User.findById(decoded._id);
  req.user = user;
  next()
} catch (error) {
    res.status(400).send("ivalid token")
}
};
=======
const User = require("./../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");

async function authenticated (req,res,next){
const token = req.header("x-auth-token");
if(!token){
    res.status(401).send("access denied");
}
try {
  const decoded = jwt.verify(token,config.get("jwt"));
  const user = await User.findById(decoded._id);
  req.user = user;
  next()
} catch (error) {
    res.status(400).send("ivalid token")
}
};
>>>>>>> 4cbd5ec95e9b515aaf66928b6d6bde10e11a920f
module.exports = authenticated;