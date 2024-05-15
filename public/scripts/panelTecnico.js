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

    //Deshabilitar botones si el estado esta en cerrado
    const rows = document.querySelectorAll('tr');

    rows.forEach(row => {
        const estadoCell = row.querySelector('.estado-celda');
        if (estadoCell && estadoCell.getAttribute('data-estado') === 'Cerrado') {
            const estadoSelect = row.querySelector('#estadoSelect');
            const redireccionButton = row.querySelector('button[data-redireccion]');

            if (estadoSelect) {
                estadoSelect.disabled = true;
                estadoSelect.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
                estadoSelect.style.color = 'white';
            }

            if (redireccionButton) {
                redireccionButton.disabled = true;
                redireccionButton.style.backgroundColor = 'gray';
                redireccionButton.style.borderColor = 'gray';
            }
        }
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

function setAction(action) {
    var form = document.getElementById('formDiagnostico');
    var comentarioT = document.getElementById('comentarioT');
    var solucion = document.getElementById('solucion');

    // Si se hace clic en "Enviar comentario"
    if (action === 'crearComentario') {
        // Establecer la acción del formulario
        form.action = 'crearComentario';
        // Eliminar la validación del campo solucion
        solucion.removeAttribute('required');
    }
    // Si se hace clic en "Cerrar diagnóstico"
    else if (action === 'crearDiagnostico') {
        // Establecer la acción del formulario
        form.action = 'crearDiagnostico';
        // Agregar validación al campo solucion
        solucion.setAttribute('required', 'required');
    }

    // Actualizar el valor del campo oculto de folioSeleccionado
    var selectValue = document.getElementById('folios').value;
    document.getElementById('folioSeleccionado').value = selectValue;
}