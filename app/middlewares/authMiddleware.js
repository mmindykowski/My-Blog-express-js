module.exports = (req, res, next) => {
  const token = req.cookies["AuthToken"];

  console.log(token);
};
