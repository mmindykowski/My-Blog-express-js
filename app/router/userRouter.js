const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signup", (_req, res) => {
  res.render("userViews/signupUser");
});

router.post("/signup", userController.create);

router.get("/login", (_req, res) => {
  if (_req.query.loginRedirect) {
    res.render("userViews/loginUser", {
      error: true,
      message: "Please login to use app",
    });
    return;
  }

  res.render("userViews/loginUser");
});

router.post("/login", userController.login);
router.get("/login", userController.logout);

module.exports = router;
