const express = require("express");
const app = express();
const db = require("./database");
const PORT = 3000;
app.use(express.static("public"));
app.use(express.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// DB ROUTES AND QUERIES
app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  var sqlTalento = `SELECT *, NULL AS contrasena FROM talento WHERE correo = '${email}' AND contrasena = '${password}';`;
  var sqlCazador = `SELECT *, NULL AS contrasena FROM cazador WHERE correo = '${email}' AND contrasena = '${password}';`;
  db.query(sqlTalento, function (err, data) {
    if (err) throw err;
    valueTalento = JSON.stringify(data);
    // If talento does not exists, look for cazador
    if (valueTalento === "[]") {
      db.query(sqlCazador, function (errCazador, dataCazador) {
        if (errCazador) throw err;
        valueCazador = JSON.stringify(dataCazador);
        res.send(valueCazador);
      });
    } else {
      res.send(valueTalento);
    }
  });
});

app.post("/signup", function (req, res, next) {
  console.log(req.body);
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;
  const lugar = req.body.lugar;
  const rol = req.body.rol;
  var query = ``;
  if (rol === "talento") {
    const capacidades = req.body.capacidades;
    const actividadProfesional = req.body.actividadProfesional;
    const costo = req.body.costo;
    const horarioInicio = req.body.horarioInicio;
    const horarioFin = req.body.horarioFin;
    query = `insert into talento (nombre, correo, contrasena, capacidades, actividadProfesional, lugar, costoHora, disponibilidadHoraInicio, disponibilidadHoraFin) VALUES ("${nombre}", "${email}", "${password}", "${capacidades}", "${actividadProfesional}", "${lugar}", ${costo}, ${horarioInicio}, ${horarioFin});`;
  } else {
    query = `insert into cazador (nombre, correo, contrasena, lugar) VALUES ("${nombre}", "${email}", "${password}", "${lugar}");`;
  }
  db.query(query, function (err, data) {
    if (err) throw err;
    res.send("true");
  });
});

// PORT
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}`);
});
