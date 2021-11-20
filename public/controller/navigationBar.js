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

const logoutSession = () => {
  sessionStorage.clear();
};
