const controller = require("../controller");
const User = require("./../../models/user.js");

module.exports = new (class extends controller {

  async fetchUser(req, res) {
    try {
      const user = await this.User.findOne({ email: "hasan@gmail.com" });
      if (user) {
        this.response({
          res,
          code: 200,
          message: "user sent successfully",
          data: user
        })
      } else {
        this.response({
          res,
          code: 500,
          message: "couldnt find the requested user",
        })
      }
    } catch (er) {
      console.log(er)
    }
  }

  async editProfile(req, res) {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    res.json({ data: user });
  }


})();