document.addEventListener("DOMContentLoaded", function () {
    // Activar la primera opción por defecto
    mostrarContenido(document.querySelector('.opcion-menu'));
});

function mostrarContenido(opcionSeleccionada) {
    // Oculta todos los contenidos
    var contenidos = document.querySelectorAll('.contenido-individual');
    contenidos.forEach(function(contenido) {
        contenido.style.display = 'none';
    });

    // Muestra el contenido seleccionado
    const id = opcionSeleccionada.getAttribute('data-id');
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
    opcionSeleccionada.classList.add('seleccionada');
}

document.getElementById('filtroForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const desdeFecha = document.getElementById('input_desde').value;
    const hastaFecha = document.getElementById('input_hasta').value;

    try {
        //console.log("enviando las fechas");
        const response = await fetch(`/filtroFechaSolicitudes?desdeFecha=${desdeFecha}&hastaFecha=${hastaFecha}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al filtrar las solicitudes');
        }

        const resultados = await response.json();
        const historialBody = document.getElementById('historialBodySoli');
        historialBody.innerHTML = '';

        resultados.forEach(solicitud => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${solicitud.FolioSolicitud}</td>
                <td>${solicitud.Fecha}</td>
                <td>${solicitud.Hora}</td>
                <td>${solicitud.NombreUsuario}</td>
                <td>${solicitud.Equipo}</td>
                <td>${solicitud.Descripcion}</td>
                <td class="estado-celda" data-estado="${solicitud.Estado}">${solicitud.Estado}</td>
                <td>${solicitud.Vale}</td>
                <td>${solicitud.Dictamen}</td>
            `;
            historialBody.appendChild(row);
        });
        // Aplicar colores a las celdas después de actualizar la tabla
        var celdas = document.querySelectorAll('.estado-celda');
        celdas.forEach(function(celda) {
            var estado = celda.getAttribute('data-estado');
            obtenerColorEstado(estado, function(color) {
                celda.style.backgroundColor = color;
            });
        });

    } catch (error) {
        console.error('Error al filtrar las solicitudes:', error);
    }
});

// Función para obtener el color correspondiente al estado
function obtenerColorEstado(estado, callback) {
    var colores = {
        'Proceso': '#007BFF', // Azul
        'Asignada': '#FFC107', // Amarillo
        'Espera': '#87CEEB', // Azul claro
        'Abierto': '#FF0000', // Rojo
        'Cerrado': '#28A745' // Verde
    };
    // Llama al callback con el color correspondiente al estado
    callback(colores[estado] || ''); // Si el estado no tiene un color asignado, usa una cadena vacía
}