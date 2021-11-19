const express = require("express");
const app = express();
const db = require("./database");

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  var sql = `SELECT *, NULL AS contrasena FROM talento WHERE correo = '${email}' AND contrasena = '${password}';`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});

app.listen(3000, function () {
  console.log("Servidor funcionando wii");
});
