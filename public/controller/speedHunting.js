var projectsArray = [];
const projectCard = `   <div class="tarjeta">
                        <p class="nombre-proyecto"></p>
                        <p><span class="tipo-proyecto"></span></p>
                        <div class="info-cazador">
                          <p class="nombre-cazador">Cazador: Luis Alonso</p>
                          <p><span class="estrellas-cazador"></span>/5⭐</p>
                        </div>
                        <p>Descripción:<span class="descripcion"></span></p><br>
                        <p><strong class="numero-vacantes">5</strong> vacantes disponibles</p>
                        <div class="botones">
                          <img class="rechazar" src="./iconos/cancel.svg" alt="Rechazar">
                          <img class="aplicar" src="./iconos/approve.svg" alt="Aplicar">
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
          var random = Math.floor(Math.random() * (data.length));
          setProjectCard(data[random]);
          data.splice(random, 1);
          projectsArray = data;
      }
    })
    .catch((e) => {
      alert(e);
    });

    function setProjectCard(data) {
        // Insert projects into the DOM
        $(".container").append(projectCard);
        document.getElementsByClassName("nombre-proyecto")[0].innerHTML =
          data.nombreProyecto;
        document.getElementsByClassName("tipo-proyecto")[0].innerHTML =
          data.tipo;
        document.getElementsByClassName("numero-vacantes")[0].innerHTML =
          data.vacantes;
        document.getElementsByClassName("descripcion")[0].innerHTML =
          data.descripcion;
        document.getElementsByClassName("nombre-cazador")[0].innerHTML =
          data.nombreCazador;
        document.getElementsByClassName("estrellas-cazador")[0].innerHTML =
          data.estrellas;
    }