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
    console.log(data);
    if (data.status === false) {
      alert("Hubo un error :(, intenta recargar la página");
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
