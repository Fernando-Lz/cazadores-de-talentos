//Show or Hide the extra fields of Talento
var rol = document.getElementById("rol").value;
$( "#rol" ).click(function() {
    rol = document.getElementById("rol").value;

    if (rol == "talento"){
        $( ".talento" ).show();
    }
    else {
        $( ".talento" ).hide();
    }
});

//Time handler (Maintain the horario-fin greater than horario-inicio)
$( "#horario-fin, #horario-inicio" ).change(function() {
    var horarioInicio = document.getElementById("horario-inicio");
    var horarioFin = document.getElementById("horario-fin");

    $(document).ready(function() {
        $("#horario-fin").attr({
           "min" : parseInt(horarioInicio.value) + 1
        });

        $("#horario-inicio").attr({
            "max" : parseInt(horarioFin.value) - 1
         });
    });
});
