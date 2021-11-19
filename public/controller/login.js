function loginValidation() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let user = data[0];
      for (var property in user) {
        sessionStorage.setItem(`${property}`, `${user[property]}`);
      }

      if (sessionStorage.length > 0) {
        window.location.href = "../proyectosDisponibles.html";
      } else {
        alert("Credenciales inválidas");
      }
    })
    .catch((e) => {
      alert(e);
    });
}

function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let user = data[0];
      for (var property in user) {
        sessionStorage.setItem(`${property}`, `${user[property]}`);
      }

      if (sessionStorage.length > 0) {
        window.location.href = "../proyectosDisponibles.html";
      } else {
        alert("Credenciales inválidas");
      }
    })
    .catch((e) => {
      alert(e);
    });
}
