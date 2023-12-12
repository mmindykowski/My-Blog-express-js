const express = require("express");
const router = express.Router();

const postApiController = require("../api/postApiController");

router.get("/", postApiController.index);
router.get("/:id", postApiController.post);
router.post("/", postApiController.create);

module.exports = router;
