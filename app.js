var express = require("express");
const bodyParser = require("body-parser");
var app = express();
var db = require("./database");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  var sql = `SELECT idTalento FROM talento WHERE correo = '${email}' AND contrasena = '${password}';`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    if (data) {
      res.redirect("/proyectosDisponibles.html");
    }
  });
});

app.listen(3000, function () {
  console.log("Servidor funcionando wii");
});
