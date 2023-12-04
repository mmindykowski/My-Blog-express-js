const express = require("express");
const router = express.Router();

router.get("/signup", (_req, res) => {
  res.render("userViews/signupUser");
});

module.exports = router;
