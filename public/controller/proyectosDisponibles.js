// Template for projectCard
const projectCard = `<div class="proyecto">
                    <p class="nombre-proyecto">Blackboard 2.0</p>
                    <p class="tipo-proyecto">Desarrollo Web</p>
                    <p class="vacantes"><strong class="numero-vacantes">5</strong> puestos disponibles</p>
                    <p class="descripcion">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi esse magni
                      molestiae asperiores,
                      reprehenderit tenetur repellat, deleniti sapiente sint amet temporibus numquam dignissimos officiis maiores.
                      Fugit nihil in optio iusto!</p>
                  </div>`;
fetch("/getProjects", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.status === false) {
      alert("Hubo un error :(, intenta recargar la página");
    } else if (data.length === 0) {
      alert("Se acabaron los proyectos!\nVuelva pronto 😃");
    } else {
      // Insert projects into the DOM
      for (let i = 0; i < data.length; i++) {
        $(".container-proyectos").append(projectCard);
        document.getElementsByClassName("nombre-proyecto")[i].innerHTML =
          data[i].nombre;
        document.getElementsByClassName("tipo-proyecto")[i].innerHTML =
          data[i].tipo;
        document.getElementsByClassName("numero-vacantes")[i].innerHTML =
          data[i].vacantes;
        document.getElementsByClassName("descripcion")[i].innerHTML =
          data[i].descripcion;
      }
    }
  })
  .catch((e) => {
    alert(e);
  });
