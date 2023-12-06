module.exports = (req, res, next) => {
  const token = req.cookies["AuthToken"];

  console.log(token);

  if (token) {
  } else {
    res.redirect("/user/login");
  }
};
