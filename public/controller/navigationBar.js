$(".navbar").load("../navigationBar.html");
window.scrollTo(0, 0);

// Delete the uncorresponding options from the navbar after the page loads completely
window.addEventListener("load", function () {
  user = {};
  user.permisos = "cazador";
  if (user.permisos === "talento") {
    $(".cazador-item").remove();
  } else if (user.permisos === "cazador") {
    $(".talento-item").remove();
  }
});
