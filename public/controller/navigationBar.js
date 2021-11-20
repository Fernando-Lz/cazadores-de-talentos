$(".navbar").load("../navigationBar.html");
window.scrollTo(0, 0);

// Delete the uncorresponding options from the navbar after the page loads completely
window.addEventListener("load", function () {
  if (sessionStorage.getItem("permisos") === "talento") {
    $(".cazador-item").remove();
  } else if (sessionStorage.getItem("permisos") === "cazador") {
    $(".talento-item").remove();
  }
});

fetch("/getActiveProject", {
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
  if (data.activeProject === true) {
    $(".speed-hunt").hide();
  } else {
    $(".speed-hunt").show();
  }
})
.catch((e) => {
  alert(e);
});

const logoutSession = () => {
  sessionStorage.clear();
};
