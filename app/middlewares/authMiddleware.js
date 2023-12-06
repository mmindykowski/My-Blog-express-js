const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports = (req, res, next) => {
  const token = req.cookies["AuthToken"];

  console.log(token);

  if (token) {
    try {
      const verified = jwt.verify(token, "secretKey");
      console.log(verified);

      User.findById(verified._id)
        .then((user) => {
          res.locals.userId = verified._id;
          res.locals.userName = user.name;
          next();
        })
        .catch((err) => {
          res.send(err);
        });
    } catch {
      res.redirect("/user/login");
    }
  } else {
    res.redirect("/user/login");
  }
};
