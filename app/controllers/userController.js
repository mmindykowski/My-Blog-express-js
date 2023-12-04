const User = require("../models/UserModel");

module.exports = {
  create: (req, res) => {
    const newUser = User(req.body);
    newUser
      .save()
      .then(() => {
        res.redirect("/blog");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render("userViews/signupUser", {
            error: true,
            message: "User already exist",
            user: req.body,
          });
        }
      });
  },
};
