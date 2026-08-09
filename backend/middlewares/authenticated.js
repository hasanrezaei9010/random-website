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
module.exports = authenticated;