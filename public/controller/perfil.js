// Set common attributes
document.getElementById("nombre").innerHTML = sessionStorage.getItem("nombre");
/*document.getElementById("reputacion").innerHTML =
  sessionStorage.getItem("totalEstrellas");*/
document.getElementById("lugar").innerHTML = sessionStorage.getItem("lugar");
// Set talento card values
if (sessionStorage.getItem("permisos") === "talento") {
  const capacidades = sessionStorage.getItem("capacidades").split(",");
  const actividadProfesional = sessionStorage
    .getItem("actividadProfesional")
    .split(",");
  const capacidadesTag = document.getElementById("capacidades");
  const actividadProfesionalTag = document.getElementById(
    "actividadProfesional"
  );

  document.getElementById("costoHora").innerHTML =
    sessionStorage.getItem("costoHora");

  document.getElementById("horaInicio").innerHTML = sessionStorage.getItem(
    "disponibilidadHoraInicio"
  );
  document.getElementById("horaFin").innerHTML = sessionStorage.getItem(
    "disponibilidadHoraFin"
  );
  capacidades.forEach((capacidad) => {
    capacidadesTag.innerHTML += `<li>${capacidad}</li>`;
  });
  actividadProfesional.forEach((actividad) => {
    actividadProfesionalTag.innerHTML += `<li>${actividad}</li>`;
  });
}
// Set cazador card values
else {
  // document.getElementById("proyectos-publicados").innerHTML =
  //   sessionStorage.getItem("totalProyectos");
  document.getElementById("puntos").innerHTML =
    sessionStorage.getItem("totalPuntos");
  let nivel = Math.floor(sessionStorage.getItem("totalPuntos") / 25);
  document.getElementById("nivel").innerHTML = nivel;
}

function cancelEdit() {
  window.location.href = "../perfilTalento.html";
}
