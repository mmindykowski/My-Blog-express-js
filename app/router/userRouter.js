const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signup", (_req, res) => {
  res.render("userViews/signupUser");
});

router.post("/signup", userController.create);

router.get("/login", (_req, res) => {
  res.render("userViews/loginUser");
});

module.exports = router;
