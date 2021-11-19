// Retreives the idProyecto from sessions storage and remove it
const idProyecto = sessionStorage.getItem("idProyecto");
const nombreProyecto = sessionStorage.getItem("nombreProyecto");
const tipoProyecto = sessionStorage.getItem("tipoProyecto");
const numeroVacantes = sessionStorage.getItem("numeroVacantes");
const descripcion = sessionStorage.getItem("descripcion");

sessionStorage.removeItem("idProyecto");
sessionStorage.removeItem("nombreProyecto");
sessionStorage.removeItem("tipoProyecto");
sessionStorage.removeItem("numeroVacantes");
sessionStorage.removeItem("descripcion");

// Loads the information of the selected project in the form
window.addEventListener("load", function () {
  const selector = document.getElementById("tipo-proyecto");
  const selectorList = Array.from(selector);
  selectorList.forEach((option, i) => {
    if (option.innerText === tipoProyecto) {
      selector.selectedIndex = i;
    }
  });
  document.getElementById("nombre-proyecto").value = nombreProyecto;
  document.getElementById("vacantes-proyecto").value = numeroVacantes;
  document.getElementById("descripcion-proyecto").value = descripcion;
});

// Function
function changeInfo() {
  const tipoProyectoForm = document.getElementById("tipo-proyecto").value;
  const nombreProyectoForm = document.getElementById("nombre-proyecto").value;
  const numeroVacantesForm = document.getElementById("vacantes-proyecto").value;
  const descripcionForm = document.getElementById("descripcion-proyecto").value;

  fetch("/modifyProject", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idProyecto: idProyecto,
      tipoProyecto: tipoProyectoForm,
      nombreProyecto: nombreProyectoForm,
      numeroVacantes: numeroVacantesForm,
      descripcion: descripcionForm,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        alert("El proyecto ha sido actualizado con éxito");
        window.location.href = "../proyectosCazador.html";
      }
    })
    .catch((e) => {
      alert(e);
    });
}
