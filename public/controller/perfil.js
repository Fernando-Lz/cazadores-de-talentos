// Set talento card values
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

function cancelEdit() {
  window.location.href = "../perfilTalento.html";
}
