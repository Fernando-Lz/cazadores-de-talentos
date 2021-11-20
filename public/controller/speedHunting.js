var projectsArray = [];
const projectCard = `   <div class="tarjeta">
                        <span id="projectId" style="display:none;"></span>
                        <p class="nombre-proyecto"></p>
                        <p><span class="tipo-proyecto"></span></p>
                        <div class="info-cazador">
                          <p class="nombre-cazador"></p>
                          <p><span class="estrellas-cazador"></span>/5⭐</p>
                        </div>
                        <p>Descripción:<span class="descripcion"></span></p><br>
                        <p><strong class="numero-vacantes"></strong> vacantes disponibles</p>
                        <div class="botones">
                          <img class="rechazar" src="./iconos/cancel.svg" alt="Rechazar" onclick="resetCard()">
                          <img class="aplicar" src="./iconos/approve.svg" alt="Aplicar" onclick="applyProject()">
                        </div>
                        </div>`;

fetch("/getAllProjects", {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify({
    idTalento: sessionStorage.getItem("idTalento"),
  }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.status === false) {
      alert("Hubo un error :(, intenta recargar la página");
    } else {
      projectsArray = data;
      resetCard(data);
    }
  })
  .catch((e) => {
    alert(e);
  });

function setProjectCard(data) {
  // Insert projects into the DOM
  $(".container").append(projectCard);
  document.getElementById("projectId").innerHTML = data.idProyecto;
  document.getElementsByClassName("nombre-proyecto")[0].innerHTML =
    data.nombreProyecto;
  document.getElementsByClassName("tipo-proyecto")[0].innerHTML = data.tipo;
  document.getElementsByClassName("numero-vacantes")[0].innerHTML =
    data.vacantes;
  document.getElementsByClassName("descripcion")[0].innerHTML =
    data.descripcion;
  document.getElementsByClassName("nombre-cazador")[0].innerHTML =
    data.nombreCazador;
  document.getElementsByClassName("estrellas-cazador")[0].innerHTML =
    data.estrellas;
}

function resetCard() {
  $(".tarjeta").remove();
  if (projectsArray.length > 0) {
    var random = Math.floor(Math.random() * projectsArray.length);
    setProjectCard(projectsArray[random]);
    projectsArray.splice(random, 1);
  } else {
    $(".container").append(
      "<div class='tarjeta'><p style='text-align:center;' class='nombre-proyecto'>No hay más proyectos disponibles</p></div>"
    );
  }
}

function applyProject() {
  fetch("/applyProject", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      idTalento: sessionStorage.getItem("idTalento"),
      idProyecto: document.getElementById("projectId").innerHTML,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === false) {
        alert("Hubo un error al procesar tu solicitud");
      } else {
      }
    })
    .catch((e) => {
      alert(e);
    });
}
