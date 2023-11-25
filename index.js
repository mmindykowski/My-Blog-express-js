const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello Nodemon!");
});

app.get('/user/:id', function (req, res) {
    res.send('user ' + req.params.id)
  })

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
