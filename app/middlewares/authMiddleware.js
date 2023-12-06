const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies["AuthToken"];

  console.log(token);

  if (token) {
    try {
      const verified = jwt.verify(token, "secretKey");
      console.log(verified);
      next();
    } catch {
      res.redirect("/user/login");
    }
  } else {
    res.redirect("/user/login");
  }
};
