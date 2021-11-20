const proyectoActualTemplate = `<p class="nombre-proyecto">Proyecto X</p>
                                <br>
                                <p class="tipo-proyecto">Bases de Datos</p>
                                <p class="descripcion">
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi esse magni
                                  molestiae asperiores,
                                  reprehenderit tenetur repellat, deleniti sapiente sint amet temporibus numquam dignissimos officiis maiores.
                                  Fugit nihil in optio iusto!</p>`;

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
      $(".proyecto-actual").append(proyectoActualTemplate);
      document.getElementsByClassName("nombre-proyecto")[0].innerHTML =
        data[0].nombre;
      document.getElementsByClassName("tipo-proyecto")[0].innerHTML =
        data[0].tipo;
      document.getElementsByClassName("descripcion")[0].innerHTML =
        data[0].descripcion;
    }
  })
  .catch((e) => {
    alert(e);
  });
