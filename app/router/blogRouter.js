const express = require("express");
const router = express.Router();

const postController = require("./app/controllers/postController");

app.get("/blog", postController.index);

app.get("/blog/add", (_req, res) => {
  res.render("blogViews/addPost");
});

app.post("/blog/add", postController.create);

app.get("/blog/:id", postController.post);

app.get("/blog/edit/:id", postController.editForm);

app.post("/blog/edit/:id", postController.update);

app.get("/blog/delete/:id", postController.delete);
