// Template for projectCard
const projectCard = `<div class="proyecto">
                      <p class="nombre-proyecto"></p>
                      <span class="boton-anunciar">
                          <img src="../iconos/announcement.svg" alt="Anunciar proyecto" onclick="anounceProject()">
                      </span>
                      <span>
                        <img class="boton-modificar" src="../iconos/edit.svg" alt="Editar proyecto" onclick="javascript:modifyProject(this.parentNode.parentNode, this.id);">
                      </span>
                      <br>
                      <p class="tipo-proyecto"></p>
                      <p class="vacantes"><strong class="numero-vacantes"></strong> puestos disponibles</p>
                      <p class="descripcion"></p>
                    </div>`;

fetch("/getProjectsCazador", {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify({
    idCazador: sessionStorage.getItem("idCazador"),
  }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.status === false) {
      alert("Hubo un error :(, intenta recargar la página");
    } else {
      // Insert projects into the DOM
      for (let i = 0; i < data.length; i++) {
        $(".proyectos-publicados").append(projectCard);
        if (data[i].anunciado === "V") {
          let card = document.getElementsByClassName("proyecto")[i];
          card.getElementsByTagName("span")[0].remove();
        }
        document.getElementsByClassName("nombre-proyecto")[i].innerHTML =
          data[i].nombre;
        document.getElementsByClassName("tipo-proyecto")[i].innerHTML =
          data[i].tipo;
        document.getElementsByClassName("numero-vacantes")[i].innerHTML =
          data[i].vacantes;
        document.getElementsByClassName("descripcion")[i].innerHTML =
          data[i].descripcion;
        document
          .getElementsByClassName("boton-modificar")
          [i].setAttribute("id", data[i].idProyecto);
      }
    }
  })
  .catch((e) => {
    alert(e);
  });

function modifyProject(proyecto, id) {
  const idProyecto = id;
  const nombreProyecto =
    proyecto.getElementsByClassName("nombre-proyecto")[0].innerHTML;
  const tipoProyecto =
    proyecto.getElementsByClassName("tipo-proyecto")[0].innerHTML;
  const numeroVacantes =
    proyecto.getElementsByClassName("numero-vacantes")[0].innerHTML;
  const descripcion =
    proyecto.getElementsByClassName("descripcion")[0].innerHTML;
  sessionStorage.setItem("idProyecto", idProyecto);
  sessionStorage.setItem("nombreProyecto", nombreProyecto);
  sessionStorage.setItem("tipoProyecto", tipoProyecto);
  sessionStorage.setItem("numeroVacantes", numeroVacantes);
  sessionStorage.setItem("descripcion", descripcion);
  window.location.href = "../forms/modificarProyecto.html";
}

function anounceProject() {
  var id = document.getElementsByClassName("boton-modificar")[0].id;
  console.log(id);
  var nivel = Math.floor(sessionStorage.getItem("totalPuntos") / 25);
  var precio = 100 - 5 * nivel;
  var selection = confirm(
    `Pagarás $${precio} para anunciar el proyecto ¿Estás seguro?`
  );
  if (selection) {
    fetch("/anounceProject", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        idProyecto: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === false) {
          alert("Hubo un error :(, inténtelo de nuevo");
        } else {
          alert("El proyecto ha sido anunciado correctamente");
          location.reload();
        }
      })
      .catch((e) => {
        alert(e);
      });
  }
}
