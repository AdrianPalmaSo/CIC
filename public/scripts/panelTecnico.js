document.addEventListener("DOMContentLoaded", function () {
    // Activar la primera opción por defecto
    mostrarContenido('asignaciones');

    // Evento de clic en botones "Redireccionar"
    document.querySelectorAll('#TablaHistorialAsignaciones [data-redireccion]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const folioSolicitud = btn.getAttribute('data-folio');
            mostrarContenido('diagnosticos');
            seleccionarFolioEnDiagnostico(folioSolicitud);
        });
    });
});

function mostrarContenido(id) {
    // Oculta todos los contenidos
    var contenidos = document.querySelectorAll('.contenido-individual');
    contenidos.forEach(function(contenido) {
        contenido.style.display = 'none';
    });

    // Muestra el contenido seleccionado
    var contenidoSeleccionado = document.getElementById(id);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.style.display = 'block';
    }

    // Elimina la clase 'seleccionada' de todas las opciones del menú
    const opcionesMenu = document.querySelectorAll('.opcion-menu');
    opcionesMenu.forEach(function(opcion) {
        opcion.classList.remove('seleccionada');
    });

    // Agrega la clase 'seleccionada' a la opción del menú seleccionada
    const opcionSeleccionada = document.querySelector('.opcion-menu[data-id="' + id + '"]');
    if (opcionSeleccionada) {
        opcionSeleccionada.classList.add('seleccionada');
    }
}

function seleccionarFolioEnDiagnostico(folio) {
    const selectSolicitudes = document.getElementById('folios');
    if (selectSolicitudes) {
        selectSolicitudes.value = folio;
    }
}
