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

const solicitudCard = `<div class="solicitud-elemento">
                        <span class="nombre-proyecto-solicitud">Facebook Meta</span>
                        <span class="id-proyecto-solicitud" style="display:none;"></span>
                        <span class="id-talento-solicitud" style="display:none;"></span>
                        <span class="costoHora-talento-solicitud" style="display:none;"></span>
                        <p>Talento: <span class="nombre-talento-solicitud">Pedrito Sola</span></p>
                        <p>Correo: <span class="correo-talento-solicitud"></span></p>
                        <p>Calificación: <span class="estrellas-talento-solicitud">4</span>/5⭐</p>
                        <div class="botones-solicitud">
                          <span class="aceptar" onclick="acceptRequest(this.parentNode.parentNode)">Aceptar</span>
                          <span class="rechazar" onclick="denyRequest(this.parentNode.parentNode)">Rechazar</span>
                        </div>
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

fetch("/getPendingRequests", {
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
        $(".solicitudes-wrapper").append(solicitudCard);
        document.getElementsByClassName("nombre-proyecto-solicitud")[
          i
        ].innerHTML = data[i].nombreProyecto;
        document.getElementsByClassName("nombre-talento-solicitud")[
          i
        ].innerHTML = data[i].nombre;
        document.getElementsByClassName("correo-talento-solicitud")[
          i
        ].innerHTML = data[i].correo;
        document.getElementsByClassName("estrellas-talento-solicitud")[
          i
        ].innerHTML = data[i].estrellas;
        document.getElementsByClassName("id-proyecto-solicitud")[i].innerHTML =
          data[i].idProyecto;
        document.getElementsByClassName("id-talento-solicitud")[i].innerHTML =
          data[i].idTalento;
        document.getElementsByClassName("costoHora-talento-solicitud")[
          i
        ].innerHTML = data[i].costoHora;
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

fetch("/getCompletedContratos", {
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
    if (data.activeProject === false) {
      console.log("Error");
    } else {
      sessionStorage.setItem("contratoName", data[0].nombre);
      sessionStorage.setItem("contratoTalento", data[0].talento);
      sessionStorage.setItem("contratoTipo", "cazador");
      if(confirm("Tienes un contrato listo para calificar, quieres checarlo?")){
        window.location.href = "../forms/evaluarTalento.html";
      }
    } 
  })
  .catch((e) => {
    alert(e);
  });
function acceptRequest(requestCard) {
  const idTalento = requestCard.getElementsByClassName(
    "id-talento-solicitud"
  )[0].innerHTML;
  const idProyecto = requestCard.getElementsByClassName(
    "id-proyecto-solicitud"
  )[0].innerHTML;
  const costoHora = requestCard.getElementsByClassName(
    "costoHora-talento-solicitud"
  )[0].innerHTML;
  fetch("/acceptRequest", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idProyecto: idProyecto,
      idTalento: idTalento,
      costoHora: costoHora,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        alert("La solicitud ha sido aceptada correctamente");
        location.reload();
      }
    })
    .catch((e) => {
      alert(e);
    });
}

function denyRequest(requestCard) {
  const idTalento = requestCard.getElementsByClassName(
    "id-talento-solicitud"
  )[0].innerHTML;
  const idProyecto = requestCard.getElementsByClassName(
    "id-proyecto-solicitud"
  )[0].innerHTML;
  fetch("/denyRequest", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idProyecto: idProyecto,
      idTalento: idTalento,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        alert("La solicitud ha sido rechazada exitosamente");
        location.reload();
      }
    })
    .catch((e) => {
      alert(e);
    });
}
