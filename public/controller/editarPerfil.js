window.addEventListener("load", function () {
  document.getElementById("cambiar-costo-hora").value =
    this.sessionStorage.getItem("costoHora");
  document.getElementById("cambiar-lugar").value =
    this.sessionStorage.getItem("lugar");
  document.getElementById("cambiar-capacidades").value =
    this.sessionStorage.getItem("capacidades");
  document.getElementById("cambiar-actividad-profesional").value =
    this.sessionStorage.getItem("actividadProfesional");
});

// Change profile info
function changeInfo() {
  const costoHora = document.getElementById("cambiar-costo-hora").value;
  const lugar = document.getElementById("cambiar-lugar").value;
  const capacidades = document.getElementById("cambiar-capacidades").value;
  const actividadProfesional = document.getElementById(
    "cambiar-actividad-profesional"
  ).value;

  fetch("/modifyProfile", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idTalento: sessionStorage.getItem("idTalento"),
      costoHora: costoHora,
      lugar: lugar,
      capacidades: capacidades,
      actividadProfesional: actividadProfesional,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        sessionStorage.setItem("costoHora", costoHora);
        sessionStorage.setItem("lugar", lugar);
        sessionStorage.setItem("capacidades", capacidades);
        sessionStorage.setItem("actividadProfesional", actividadProfesional);
        alert("Tu información ha sido actualizada con éxito");
        window.location.href = "../perfilTalento.html";
      }
    })
    .catch((e) => {
      alert(e);
    });
}
