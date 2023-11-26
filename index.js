const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");

const Post = require("./app/models/PostModel");

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/mongoose", async function (req, res) {
  Post.findById('63bfb0e000bf08070bf491ca')
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/", function (req, res) {
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

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
