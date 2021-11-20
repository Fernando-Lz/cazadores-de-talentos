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
  var sqlCazador = `SELECT cazador.idCazador, cazador.nombre, cazador.correo, cazador.lugar, cazador.permisos, SUM(cazador.estrellas)/count(proyecto.nombre) as totalEstrellas, count(proyecto.nombre) as totalProyectos, SUM(contrato.puntosContrato) as totalPuntos FROM contrato, proyecto, cazador WHERE contrato.idProyecto = proyecto.idProyecto AND proyecto.cazador = cazador.idCazador AND cazador.correo = '${email}' AND cazador.contrasena = '${password}';`;
  db.query(sqlTalento, function (err, data) {
    if (err) throw err;
    valueTalento = JSON.stringify(data);
    // If talento does not exists, look for cazador
    if (valueTalento === "[]") {
      db.query(sqlCazador, function (errCazador, dataCazador) {
        if (errCazador) {
          res.send(JSON.stringify({ status: false }));
        } else if (dataCazador === "[]") {
          res.send(JSON.stringify({ status: false }));
        } else if (dataCazador[0].nombre === dataCazador[0].permisos) {
          res.send(JSON.stringify({ status: false }));
        } else {
          res.send(JSON.stringify(dataCazador));
        }
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
  const query = `SELECT proyecto.nombre, proyecto.descripcion, proyecto.tipo, proyecto.vacantes FROM contrato, proyecto, cazador WHERE proyecto.cazador = cazador.idCazador AND proyecto.vacantes > 0 AND proyecto.anunciado = "V" group by nombre;`;
  db.query(query, function (err, data) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

// Returns true or false, depending if the talent is involved in a project
app.post("/getActiveProject", function (req, res, next) {
  const idTalento = req.body.idTalento;
  const query = `SELECT proyecto.nombre FROM proyecto WHERE proyecto.talento = ${idTalento} GROUP BY proyecto.nombre;`;
  db.query(query, function (err, data) {
    proyectoList = JSON.stringify(data);
    if (proyectoList === "[]") {
      res.send(JSON.stringify({ activeProject: false }));
    } else {
      res.send(JSON.stringify({ activeProject: true }));
    }
  });
});

app.post("/getProjectsCazador", function (req, res, next) {
  const idCazador = req.body.idCazador;
  const query = `SELECT proyecto.nombre, proyecto.descripcion, proyecto.tipo, proyecto.vacantes, proyecto.idProyecto, proyecto.anunciado FROM contrato, proyecto, cazador WHERE proyecto.cazador = cazador.idCazador AND proyecto.cazador = ${idCazador} group by nombre;`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

// Return the current project that the talent is involved
app.post("/getProjectTalent", function (req, res, next) {
  const idTalento = req.body.idTalento;
  const query = `SELECT proyecto.nombre, proyecto.descripcion, proyecto.tipo FROM proyecto WHERE proyecto.talento = ${idTalento};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post("/modifyProject", function (req, res, next) {
  const idProyecto = req.body.idProyecto;
  const tipoProyecto = req.body.tipoProyecto;
  const nombreProyecto = req.body.nombreProyecto;
  const numeroVacantes = req.body.numeroVacantes;
  const descripcion = req.body.descripcion;
  const query = `UPDATE proyecto SET tipo="${tipoProyecto}", nombre = "${nombreProyecto}", vacantes = ${numeroVacantes}, descripcion = "${descripcion}" 
  WHERE idProyecto = ${idProyecto};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/anounceProject", function (req, res, next) {
  const idProyecto = req.body.idProyecto;
  const query = `UPDATE proyecto SET anunciado="V"  WHERE idProyecto=${idProyecto};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/createProject", function (req, res, next) {
  const idCazador = req.body.idCazador;
  const tipoProyecto = req.body.tipoProyecto;
  const nombreProyecto = req.body.nombreProyecto;
  const numeroVacantes = req.body.numeroVacantes;
  const descripcion = req.body.descripcion;
  const query = `INSERT INTO proyecto (cazador, nombre, tipo, vacantes, descripcion) VALUES (${idCazador}, "${nombreProyecto}", "${tipoProyecto}", ${numeroVacantes}, "${descripcion}");`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/getAllProjects", function (req, res, next) {
  const idTalento = req.body.idTalento;
  const query = `SELECT a.idProyecto, a.nombreProyecto, a.tipo, a.descripcion, a.vacantes, a.nombreCazador, a.estrellas FROM 
  (
    SELECT proyecto.idProyecto, proyecto.nombre AS nombreProyecto, proyecto.tipo, proyecto.descripcion, proyecto.vacantes, cazador.nombre AS nombreCazador, cazador.estrellas FROM proyecto, cazador
    WHERE proyecto.cazador = cazador.idCazador AND proyecto.vacantes > 0 AND proyecto.talento != ${idTalento}
  ) a
  LEFT JOIN (
    SELECT proyecto.idProyecto, proyecto.nombre AS nombreProyecto, proyecto.tipo, proyecto.descripcion, proyecto.vacantes, cazador.nombre AS nombreCazador, cazador.estrellas FROM solicitudes, proyecto, cazador 
    WHERE proyecto.cazador = cazador.idCazador AND proyecto.vacantes > 0 AND proyecto.talento != ${idTalento} AND proyecto.idProyecto = solicitudes.idProyecto
  ) b
  ON a.idProyecto = b.idProyecto
  WHERE b.idProyecto IS NULL;`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post("/applyProject", function (req, res, next) {
  const idTalento = req.body.idTalento;
  const idProyecto = req.body.idProyecto;
  const query = `INSERT INTO solicitudes (talento, cazador, idProyecto) SELECT ${idTalento}, cazador.idCazador, ${idProyecto} FROM proyecto, cazador WHERE proyecto.cazador = cazador.idCazador AND proyecto.idProyecto = ${idProyecto};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

// PORT
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}`);
});
