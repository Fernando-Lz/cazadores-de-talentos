function createProject() {
  const tipoProyecto = document.getElementById("tipo-proyecto").value;
  const nombreProyecto = document.getElementById("nombre-proyecto").value;
  const numeroVacantes = document.getElementById("vacantes-proyecto").value;
  const descripcion = document.getElementById("descripcion-proyecto").value;

  fetch("/createProject", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idCazador: sessionStorage.getItem("idCazador"),
      tipoProyecto: tipoProyecto,
      nombreProyecto: nombreProyecto,
      numeroVacantes: numeroVacantes,
      descripcion: descripcion,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        alert("El proyecto ha sido creado con éxito");
        window.location.href = "../proyectosCazador.html";
      }
    })
    .catch((e) => {
      alert(e);
    });
}
