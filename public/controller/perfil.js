// Set talento card values
const capacidades = sessionStorage.getItem("capacidades").split(",");
const actividadProfesional = sessionStorage
  .getItem("actividadProfesional")
  .split(",");
const capacidadesTag = document.getElementById("capacidades");
const actividadProfesionalTag = document.getElementById("actividadProfesional");
document.getElementById("nombre").innerHTML = sessionStorage.getItem("nombre");
document.getElementById("reputacion").innerHTML =
  sessionStorage.getItem("estrellas");
document.getElementById("costoHora").innerHTML =
  sessionStorage.getItem("costoHora");
document.getElementById("lugar").innerHTML = sessionStorage.getItem("lugar");
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

function cancelEdit() {
  window.location.href = "../perfilTalento.html";
}
