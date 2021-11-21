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
  const query = `SELECT idProyecto FROM contrato WHERE talento = ${idTalento} AND statusContrato = "En Proceso";`;
  db.query(query, function (err, data) {
    proyectoList = JSON.stringify(data);
    if (proyectoList === "[]") {
      res.send(JSON.stringify({ activeProject: false }));
    } else {
      res.send(JSON.stringify({ activeProject: true }));
    }
  });
});

app.post("/getCompletedContratos", function (req, res, next) {
  const idCazador = req.body.idCazador;
  const idTalento = req.body.idTalento;
  const query = `SELECT proyecto.nombre, cazador.nombre AS cazador, talento.nombre AS talento FROM proyecto, contrato, talento, cazador WHERE (proyecto.cazador = '${idCazador}' OR proyecto.talento = '${idTalento}') AND (proyecto.cazador = cazador.idCazador OR proyecto.talento = talento.idTalento) AND proyecto.idProyecto = contrato.idProyecto AND contrato.statusContrato = "Terminado" GROUP BY proyecto.nombre;`;
  db.query(query, function (err, data) {
    proyectoList = JSON.stringify(data);
    if (proyectoList === "[]") {
      res.send(JSON.stringify({ activeProject: false }));
    } else {
      res.send(JSON.stringify(data));
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
  const query = `SELECT proyecto.nombre, proyecto.descripcion, proyecto.tipo FROM proyecto WHERE proyecto.idProyecto = (SELECT idProyecto FROM contrato WHERE talento = ${idTalento} and statusContrato = "En proceso");`;
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
  const query = `SELECT DISTINCT proyecto.idProyecto, proyecto.nombre AS nombreProyecto, proyecto.tipo, proyecto.descripcion, proyecto.vacantes, cazador.nombre AS nombreCazador, cazador.estrellas FROM vacante, proyecto, cazador
  WHERE proyecto.cazador = cazador.idCazador AND proyecto.vacantes > 0 AND vacante.proyecto = proyecto.idProyecto AND proyecto.idProyecto NOT IN (SELECT vacante.proyecto FROM vacante WHERE vacante.talento = ${idTalento}) AND proyecto.idProyecto NOT IN (SELECT idProyecto FROM solicitudes WHERE talento = ${idTalento});`;
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

app.post("/getPendingRequests", function (req, res, next) {
  const idCazador = req.body.idCazador;
  const query = `SELECT talento.costoHora, talento.nombre, talento.correo, talento.estrellas, solicitudes.idProyecto, solicitudes.talento AS idTalento, proyecto.nombre AS nombreProyecto FROM talento, solicitudes, proyecto WHERE proyecto.idProyecto = solicitudes.idProyecto AND talento.idTalento = solicitudes.talento AND idTalento IN (SELECT talento FROM solicitudes WHERE idProyecto IN (SELECT idProyecto FROM proyecto WHERE cazador = ${idCazador}));`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post("/acceptRequest", function (req, res, next) {
  const idProyecto = req.body.idProyecto;
  const idTalento = req.body.idTalento;
  const costoHora = req.body.costoHora;
  const query = `insert into contrato (talento, idProyecto, horasPago, puntosContrato, estrellasObtenidasTalento, estrellasObtenidasCazador) VALUES (${idTalento}, ${idProyecto}, ${costoHora}, 15, 0, 0);`;
  const queryDelete = `DELETE FROM solicitudes WHERE talento = ${idTalento} AND idProyecto = ${idProyecto};`;
  const queryUpdate = `UPDATE proyecto SET vacantes = vacantes - 1 Where idProyecto = ${idProyecto};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      db.query(queryDelete, function (error, dataC) {
        if (error) {
          res.send(JSON.stringify({ status: false }));
          db.query(queryUpdate, function (error, dataC) {
            if (error) {
              res.send(JSON.stringify({ status: false }));
            }
          });
        }
      });
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/denyRequest", function (req, res, next) {
  const idProyecto = req.body.idProyecto;
  const idTalento = req.body.idTalento;
  const query = `DELETE FROM solicitudes WHERE talento = ${idTalento} AND idProyecto = ${idProyecto};`;
  db.query(query, function (err, data) {
    if (err) {
      res.send(JSON.stringify({ status: false }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});

app.post("/updateStars", function (req, res, next) {
  const userType = req.body.userType;
  const nameUser = req.body.nameUser;
  const estrellas = req.body.estrellas;
  var sqlUpdateTalento = `UPDATE ${userType} SET estrellas='${estrellas}' WHERE ${userType}.nombre="${nameUser}";`;
  db.query(sqlUpdateTalento, function (err, data) {
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
