const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, postController.index);

router.get("/add", (_req, res) => {
  res.render("blogViews/addPost");
});

router.post("/add", postController.create);

router.get("/:id", postController.post);

router.get("/edit/:id", postController.editForm);

router.post("/edit/:id", postController.update);

router.get("/delete/:id", postController.delete);

module.exports = router;
