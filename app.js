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
        if (errCazador) {
          res.send(JSON.stringify({ status: false }));
        }
        valueCazador = JSON.stringify(dataCazador);
        res.send(valueCazador);
      });
    } else {
      res.send(valueTalento);
    }
  });
});

app.post("/signup", function (req, res, next) {
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
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/modifyProfile", function (req, res, next) {
  const idTalento = req.body.idTalento;
  const costoHora = req.body.costoHora;
  const lugar = req.body.lugar;
  const capacidades = req.body.capacidades;
  const actividadProfesional = req.body.actividadProfesional;

  const query = `UPDATE talento SET costoHora=${costoHora}, lugar = "${lugar}", capacidades = "${capacidades}", actividadProfesional = "${actividadProfesional}" WHERE idTalento = ${idTalento};`;

  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.get("/getProjects", function (req, res, next) {
  const query = `SELECT proyecto.nombre, proyecto.descripcion, proyecto.tipo, proyecto.vacantes FROM contrato, proyecto, cazador WHERE contrato.idProyecto = proyecto.idProyecto AND proyecto.cazador = cazador.idCazador AND proyecto.vacantes > 0 group by nombre;`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

// PORT
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}`);
});
