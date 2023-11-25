const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello Nodemon!");
});

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
