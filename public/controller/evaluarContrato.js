const nombreContrato = sessionStorage.getItem("contratoName");
const nombreCazador = sessionStorage.getItem("contratoCazador");
const nombreTalento = sessionStorage.getItem("contratoTalento");
const tipo = sessionStorage.getItem("contratoTipo");

sessionStorage.removeItem("contratoName");
sessionStorage.removeItem("contratoCazador");
sessionStorage.removeItem("contratoTalento");
sessionStorage.removeItem("contratoTipo");

// Loads the information of the selected project in the form
window.addEventListener("load", function () {
    document.getElementsByClassName("nombre-proyecto")[0].innerHTML = nombreContrato;
    if (tipo === "cazador"){ 
        document.getElementsByClassName("nombre-talento")[0].innerHTML = nombreTalento;
    } else if (tipo === "talento") {
        document.getElementsByClassName("nombre-cazador")[0].innerHTML = nombreCazador;
    }
});

let nameUser = "";
let typeUser = "";
let idProject = 0;
let upperCaseType = "";
if (tipo === "cazador"){ 
    nameUser = nombreTalento;
    typeUser = "talento";
    upperCaseType = "Talento";
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
          alert("Error al encontrar el proyecto");
        } else {
          idProject = data[0].idProyecto;
        }
      })
      .catch((e) => {
        alert(e);
      });
} else if (tipo === "talento") {
    nameUser = nombreCazador;
    typeUser = "cazador";
    upperCaseType = "Cazador";
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
          alert("Error al encontrar el proyecto");
        } else {
          idProject = data[0].idProyecto;
        }
      })
      .catch((e) => {
        alert(e);
      });
}

function submitEvaluation() {
    const stars = document.getElementById("calificacion").value;

    fetch("/updateStars", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userType: typeUser,
          upperCaseType: upperCaseType,
          nameUser: nameUser,
          estrellas: stars,
          idProject: idProject,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === false) {
            alert("Hubo un error :(, inténtelo de nuevo");
          } else {
            alert("Gracias por evaluar!");
            window.location.href = "../proyectosCazador.html";
          }
        })
        .catch((e) => {
          alert(e);
        });
}