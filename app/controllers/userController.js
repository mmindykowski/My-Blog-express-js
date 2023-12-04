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
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        console.log(user);
        if (!user) {
          res.render("userViews/loginUser", {
            error: true,
            message: "That user not exist",
            user: req.body,
          });
          return;
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
