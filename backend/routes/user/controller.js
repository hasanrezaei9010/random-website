const controller = require("../controller");
const User = require("./../../models/user.js");

module.exports = new (class extends controller {

  async loggedAdmin(req, res) {
    try {
      const {id} = req.params;
      const admin = await this.User.findById(id);
      if (admin) {
        this.response({
          res,
          code: 200,
          message: "admin sent successfully",
          data: admin
        })
      } else {
        this.response({
          res,
          code: 500,
          message: "couldnt find the requested admin",
        })
      }
    } catch (er) {
      console.error(er)
    }
  }

  async editProfile(req, res) {
    try {
      const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    res.json({ data: user });
    } catch (error) {
      res.json({ message: error });
      console.error(error)
    }
    
  }

  async fetchAdmin(req,res) {
    try {
      const admins = await this.User.find({admin : true});
      if (admins) {
        this.response({
          res,
          code: 200,
          message: "users sent successfully",
          data: admins
        })
      } else {
        this.response({
          res,
          code: 500,
          message: "couldnt find the requested users",
        })
      }
    } catch (er) {
      console.error(er)
    }
  }

})();