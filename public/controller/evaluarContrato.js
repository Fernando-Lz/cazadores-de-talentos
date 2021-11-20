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