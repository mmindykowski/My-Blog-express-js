const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");

const Post = require("./app/models/PostModel");

const postController = require("./app/controllers/postController");

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.get("/mongoose/:id", function (req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      res.render("home", {
        title: post.title,
        content: post.content,
        displayTitle: true,
        names: ["Adam", "Ola", "Kasia", "Tomek"],
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/", function (_req, res) {
  res.render("home", {
    title: "My app title",
    content: "Lorem ipsum",
    displayTitle: false,
    names: ["Adam", "Ola", "Kasia", "Tomek"],
  });
});

// app.get("/user/:id?/:name?", function (req, res) {
//   if (req.params.id) {
//     res.send("user" + req.params.id + "" + req.params.name);
//   } else {
//     res.send("All users");
//   }
// });

// app.get("/data", function (req, res) {
//   if (req.query.search) {
//     res.send("Wyszukaj" + req.query.search + "" + req.query.model);
//   } else {
//     res.send("Błąd");
//   }
// });

app.get("/blog", postController.index);

app.get("/blog/add", (_req, res) => {
  res.render("blogViews/addPost");
});

app.post("/blog/add", postController.create);

app.get("/blog/:id", postController.post);

app.get("/blog/edit/:id", postController.editForm);

app.post("/blog/edit/:id", postController.update);

app.get("/blog/delete/:id", postController.delete);

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
