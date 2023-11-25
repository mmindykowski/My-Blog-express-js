const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Hello World!");
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
