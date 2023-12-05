const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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
        if (!user) {
          res.render("userViews/loginUser", {
            error: true,
            message: "That user not exist",
            user: req.body,
          });
          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login error",
              user: { email: req.body.email, password: "" },
            });
            return;
          }

          if (logged) {
            const token = user.generateAuthToken(user);
            res.cookie("AuthToken", token);
            res.redirect("/blog");
          } else {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login data do not match",
              user: { email: req.body.email, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

// 7.3
