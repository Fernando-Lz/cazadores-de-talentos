$(".navbar").load("../navigationBar.html");
window.scrollTo(0, 0);

let users = [
  {
    permisos: "talento",
  },
  {
    permisos: "cazador",
  },
];

// Delete the uncorresponding options from the navbar after the page loads completely
window.addEventListener("load", function () {
  if (users[1].permisos === "talento") {
    $(".cazador-item").remove();
  } else if (users[1].permisos === "cazador") {
    $(".talento-item").remove();
  }
});

const logoutSession = () => {
  sessionStorage.clear();
};
