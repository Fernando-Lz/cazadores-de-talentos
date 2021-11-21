//Show or Hide the extra fields of Talento
var rol = document.getElementById("rol").value;
$("#rol").click(function () {
  rol = document.getElementById("rol").value;

  if (rol == "talento") {
    $(".talento").show();
  } else {
    $(".talento").hide();
  }
});

//Time handler (Maintain the horario-fin greater than horario-inicio)
$("#horario-fin, #horario-inicio").change(function () {
  var horarioInicio = document.getElementById("horario-inicio");
  var horarioFin = document.getElementById("horario-fin");

  $(document).ready(function () {
    $("#horario-fin").attr({
      min: parseInt(horarioInicio.value) + 1,
    });

    $("#horario-inicio").attr({
      max: parseInt(horarioFin.value) - 1,
    });
  });
});

// Fetch Sign-Up
function signUp() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const lugar = document.getElementById("place").value;
  const rol = document.getElementById("rol").value;
  let body;

  if (rol === "talento") {
    const capacidades = document.getElementById("capacidades").value;
    const actividadProfesional = document.getElementById(
      "actividad-profesional"
    ).value;
    const costo = document.getElementById("costo").value;
    const horarioInicio = document.getElementById("horario-inicio").value;
    const horarioFin = document.getElementById("horario-fin").value;
    body = JSON.stringify({
      nombre: nombre,
      email: email,
      password: password,
      lugar: lugar,
      rol: rol,
      capacidades: capacidades,
      actividadProfesional: actividadProfesional,
      costo: costo,
      horarioInicio: horarioInicio,
      horarioFin: horarioFin,
    });
  } else {
    body = JSON.stringify({
      nombre: nombre,
      email: email,
      password: password,
      lugar: lugar,
      rol: rol,
    });
  }

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: body,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data === false) {
        alert("Hubo un error :(, inténtelo de nuevo");
      } else {
        alert("Ha sido registrado con éxito :)");
        window.location.href = "../index.html";
      }
    })
    .catch((e) => {
      alert(e);
    });
}
