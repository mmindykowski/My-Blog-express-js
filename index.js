const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");

const Post = require("./app/models/PostModel");

const blogRouter = require("./app/router/blogRouter");
const blogApiRouter = require("./app/router/blogApiRouter");
const userRouter = require("./app/router/userRouter");
const userApiRouter = require("./app/router/userApiRoter");

const authMiddleware = require("./app/middlewares/authMiddleware");

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

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

/* Routes */
app.use("/blog", authMiddleware, blogRouter);
app.use("/user", userRouter);

/* API Routes */
app.use("/api/posts", blogApiRouter);
app.use("/api/user", userApiRouter);

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
