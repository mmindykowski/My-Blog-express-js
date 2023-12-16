const express = require("express");
const router = express.Router();

const userApiController = require("../api/userApiController");

router.post("/signup", userApiController.create);

module.exports = router;
