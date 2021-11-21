const proyectoActualTemplate = `<p class="nombre-proyecto"></p>
                                <br>
                                <p class="tipo-proyecto"></p>
                                <p class="descripcion">
                                  </p>`;

fetch("/getProjectTalent", {
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
    } else if (data.length < 1) {
      $(".proyecto-actual").append("<h3>No estás en ningún proyecto 😢</h3>");
    } else {
      // Insert projects into the DOM
      if (data.length > 0) {
        $(".proyecto-actual").append(proyectoActualTemplate);
        document.getElementsByClassName("nombre-proyecto")[0].innerHTML =
          data[0].nombre;
        document.getElementsByClassName("tipo-proyecto")[0].innerHTML =
          data[0].tipo;
        document.getElementsByClassName("descripcion")[0].innerHTML =
          data[0].descripcion;
      }
    }
  })
  .catch((e) => {
    alert(e);
  });
  
  
  fetch("/getCompletedContratos", {
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
      if (data.activeProject === false) {
        console.log("Error");
      } else {
        if (data[0].estrellasObtenidasTalento == 0 || data[0].estrellasObtenidasCazador == 0) {
          sessionStorage.setItem("contratoName", data[0].nombre);
          sessionStorage.setItem("contratoCazador", data[0].cazador);
          sessionStorage.setItem("contratoTipo", "talento");
          if(confirm("Tienes un contrato listo para calificar, quieres checarlo?")){
            window.location.href = "../forms/evaluarCazador.html";
          }
        }
      } 
    })
    .catch((e) => {
      alert(e);
    });