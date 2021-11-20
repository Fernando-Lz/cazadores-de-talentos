DROP DATABASE IF EXISTS TalentHunter;

CREATE DATABASE TalentHunter CHARACTER SET utf8 COLLATE utf8_general_ci;

USE TalentHunter;

CREATE TABLE talento(
  idTalento INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contrasena VARCHAR(50) NOT NULL,
  capacidades VARCHAR(250) NOT NULL,
  actividadProfesional VARCHAR(250) NOT NULL,
  lugar VARCHAR(50) NOT NULL,
  costoHora INT NOT NULL,
  disponibilidadHoraInicio INT NOT NULL,
  disponibilidadHoraFin INT NOT NULL,
  estrellas INT NOT NULL DEFAULT 0,
  permisos VARCHAR(10) DEFAULT 'talento',
  PRIMARY KEY (idTalento)
);

CREATE TABLE cazador(
  idCazador INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contrasena VARCHAR(50) NOT NULL,
  lugar VARCHAR(50) NOT NULL,
  puntos INT NOT NULL DEFAULT 0,
  estrellas INT NOT NULL DEFAULT 0,
  permisos VARCHAR(10) DEFAULT 'cazador',
  PRIMARY KEY (idCazador)
);

CREATE TABLE proyecto(
  idProyecto INT NOT NULL AUTO_INCREMENT,
  cazador INT NOT NULL REFERENCES cazador(idCazador),
  talento INT REFERENCES talento(idTalento),
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(25) NOT NULL,
  vacantes INT NOT NULL,
  descripcion VARCHAR(250) NOT NULL,
  CONSTRAINT tiposValidos CHECK (
    tipo = 'Desarrollo Web'
    OR tipo = 'Desarrollo Móvil'
    OR tipo = 'Base de Datos'
    OR tipo = 'Ciencia de Datos'
    OR tipo = 'Seguridad Informática'
  ),
  PRIMARY KEY (idProyecto)
);

CREATE TABLE contrato(
  idContrato INT NOT NULL AUTO_INCREMENT,
  talento INT NOT NULL REFERENCES talento(idTalento),
  idProyecto INT NOT NULL REFERENCES proyecto(idProyecto),
  horasPago INT NOT NULL,
  puntosContrato INT NOT NULL,
  estrellasObtenidasTalento INT,
  estrellasObtenidasCazador INT,
  comentariosCazador VARCHAR(250) NOT NULL DEFAULT '',
  comentariosTalento VARCHAR(250) NOT NULL DEFAULT '',
  statusContrato VARCHAR(10) NOT NULL DEFAULT 'En proceso',
  CONSTRAINT statusValidos CHECK(
    statusContrato = 'En proceso'
    OR statusContrato = 'Terminado'
  ),
  KEY (idContrato),
  PRIMARY KEY (talento, idProyecto)
);

CREATE TABLE vacante (
  proyecto INT NOT NULL REFERENCES proyecto(idProyecto),
  talento INT REFERENCES talento(idTalento)
);