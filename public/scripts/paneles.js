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

$(document).ready(function() {
    // Función para manejar el evento click del botón de observaciones
    function handleDescripcionClick() {
        var descripcion = $(this).data('descripcion');

        // Limpiar tabla de descripciones
        $('#descripcionesProblema').empty();

        // Agregar la descripción a la tabla en el modal
        var row = $('<tr>');
        row.append('<td>' + descripcion + '</td>');

        $('#descripcionesProblema').append(row);
    }

    // Agregar el evento click a los botones de observaciones
    $('.btn-descripcion').click(handleDescripcionClick);

    // Función para manejar el submit del formulario de filtrado de fechas
    $('#filtroForm').submit(async function(e) {
        e.preventDefault();

        const desdeFecha = document.getElementById('input_desde').value;
        const hastaFecha = document.getElementById('input_hasta').value;

        try {
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
                    <td>
                        <a href="#" class="btn btn-descripcion" data-toggle="modal" data-target="#exampleModalLong5" data-descripcion="${solicitud.Descripcion}">
                            <img src="resources/images/ver.png" alt="Ojo">
                        </a>
                    </td>
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

            // Reasignar el evento click a los nuevos botones de observaciones
            $('.btn-descripcion').click(handleDescripcionClick);

        } catch (error) {
            console.error('Error al filtrar las solicitudes:', error);
        }
    });
});

document.getElementById('filtroFormEstatus').addEventListener('submit', function(event) {
    event.preventDefault();

    const desdeFecha = document.getElementById('input_desde_status').value;
    const hastaFecha = document.getElementById('input_hasta_status').value;

    fetch('/filtroFechaEstatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desdeFecha, hastaFecha }),
    })
    .then(response => response.json())
    .then(data => {
        // Construir la tabla dinámicamente
        const newTable = construirTablaDinamica(data);
        
        // Reemplazar la tabla antigua con la nueva
        const oldTable = document.getElementById('estatusTabla');
        oldTable.parentNode.replaceChild(newTable, oldTable);
        
        // Llamar a la función para activar los estilos de la tabla
        aplicarEstilosTabla(newTable);
    })
    .catch(error => console.error('Error:', error));
});

function construirTablaDinamica(data) {
    const { abierto, asignada, pendiente, espera, cerrado } = data;
        const tableBody = document.querySelector('#estatusTabla tbody');

        // Eliminar contenido anterior de la tabla
        tableBody.innerHTML = '';

        // Construir nueva tabla con encabezados y atributos
        const newTable = document.createElement('table');
        newTable.className = 'table'; // Clase principal
        newTable.id = 'estatusTabla'; // ID principal

        // Fila de encabezados principales
        const headerRowMain = document.createElement('tr');
        headerRowMain.className = 'tableEstatus'; // Clase de fila principal

        // Abierto
        const abiertoHeader = document.createElement('th');
        abiertoHeader.setAttribute('colspan', '5');
        abiertoHeader.className = 'tablaTitulos'; // Clase de encabezado
        abiertoHeader.textContent = 'Abierto';
        headerRowMain.appendChild(abiertoHeader);

        // Asignadas
        const asignadasHeader = document.createElement('th');
        asignadasHeader.setAttribute('colspan', '4');
        asignadasHeader.className = 'tablaTitulos'; // Clase de encabezado
        asignadasHeader.textContent = 'Asignadas';
        headerRowMain.appendChild(asignadasHeader);

        // En Proceso
        const procesoHeader = document.createElement('th');
        procesoHeader.setAttribute('colspan', '4');
        procesoHeader.className = 'tablaTitulos'; // Clase de encabezado
        procesoHeader.textContent = 'En Proceso';
        headerRowMain.appendChild(procesoHeader);

        // En Espera
        const esperaHeader = document.createElement('th');
        esperaHeader.setAttribute('colspan', '4');
        esperaHeader.className = 'tablaTitulos'; // Clase de encabezado
        esperaHeader.textContent = 'En Espera';
        headerRowMain.appendChild(esperaHeader);

        // Cerrado
        const cerradoHeader = document.createElement('th');
        cerradoHeader.setAttribute('colspan', '4');
        cerradoHeader.className = 'tablaTitulos'; // Clase de encabezado
        cerradoHeader.textContent = 'Cerrado';
        headerRowMain.appendChild(cerradoHeader);

        newTable.appendChild(headerRowMain);

        // Fila de encabezados de columnas
        const headerRowColumns = document.createElement('tr');
        headerRowColumns.className = 'table-secondary'; // Clase de fila de encabezados

        // Abierto
        headerRowColumns.innerHTML = `
            <th>Folio</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Fecha</th>
            <th>Estatus</th>
        `;

        // Asignadas
        headerRowColumns.innerHTML += `
            <th>Folio</th>
            <th>Nombre</th>
            <th>Técnico</th>
            <th>Estatus</th>
        `;

        // En Proceso
        headerRowColumns.innerHTML += `
            <th>Folio</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Estatus</th>
        `;

        // En Espera
        headerRowColumns.innerHTML += `
            <th>Folio</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Estatus</th>
        `;

        // Cerrado
        headerRowColumns.innerHTML += `
            <th>Folio</th>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Estatus</th>
        `;

        newTable.appendChild(headerRowColumns);

        // Cuerpo de la tabla
        const maxLength = Math.max(abierto.length, asignada.length, pendiente.length, espera.length, cerrado.length);

        for (let i = 0; i < maxLength; i++) {
            const row = document.createElement('tr');

            // Abierto
            if (i < abierto.length) {
                row.innerHTML += `
                    <td class="bg-danger">${abierto[i].FolioSolicitud}</td>
                    <td class="bg-danger">${abierto[i].Nombre}</td>
                    <td class="bg-danger">${abierto[i].Equipo}</td>
                    <td class="bg-danger">${abierto[i].Fecha}</td>
                    <td class="bg-danger">
                        <select class="form-select cambiarEstado" data-folio="${abierto[i].FolioSolicitud}">
                            <option value="Abierto" selected>Abierto</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td><td></td>';
            }

            // Asignadas
            if (i < asignada.length) {
                row.innerHTML += `
                    <td class="bg-warning">${asignada[i].FolioSolicitud}</td>
                    <td class="bg-warning">${asignada[i].UsuarioNombre}</td>
                    <td class="bg-warning">${asignada[i].Nombre}</td>
                    <td class="bg-warning">
                        <select class="form-select cambiarEstado" data-folio="${asignada[i].FolioSolicitud}">
                            <option value="Asignada" selected>Asignada</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td>';
            }

            // En Proceso
            if (i < pendiente.length) {
                row.innerHTML += `
                    <td class="bg-info">${pendiente[i].FolioSolicitud}</td>
                    <td class="bg-info">${pendiente[i].Nombre}</td>
                    <td class="bg-info">${pendiente[i].Equipo}</td>
                    <td class="bg-info">
                        <select class="form-select cambiarEstado" data-folio="${pendiente[i].FolioSolicitud}">
                            <option value="Proceso" selected>En Proceso</option>
                            <option value="Abierto">Abierto</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td>';
            }

            // En Espera
            if (i < espera.length) {
                row.innerHTML += `
                    <td class="bg-primary">${espera[i].FolioSolicitud}</td>
                    <td class="bg-primary">${espera[i].Nombre}</td>
                    <td class="bg-primary">${espera[i].Equipo}</td>
                    <td class="bg-primary">
                        <select class="form-select cambiarEstado" data-folio="${espera[i].FolioSolicitud}">
                            <option value="Proceso">En Proceso</option>
                            <option value="Abierto">Abierto</option>
                            <option value="Espera" selected>En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td>';
            }

            // Cerrado
            if (i < cerrado.length) {
                row.innerHTML += `
                    <td class="bg-success">${cerrado[i].FolioSolicitud}</td>
                    <td class="bg-success">${cerrado[i].Nombre}</td>
                    <td class="bg-success">${cerrado[i].Equipo}</td>
                    <td class="bg-success">
                        <select class="form-select cambiarEstado" data-folio="${cerrado[i].FolioSolicitud}">
                            <option value="Cerrado" selected>Cerrado</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Asignada">Asignada</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td>';
            }

            newTable.appendChild(row);
        }
        // Reemplazar la tabla antigua con la nueva
        const oldTable = document.getElementById('estatusTabla');
        oldTable.parentNode.replaceChild(newTable, oldTable);
        // Llamar a la función para activar los estilos de la tabla
        reactivarEstilosTabla();

    return newTable;
}

function aplicarEstilosTabla(table) {
    try {
        // Seleccionar la tabla y sus elementos hijos
        var tabla = table;
        if (tabla) {
            // Aplicar estilos CSS a la tabla y sus elementos
            tabla.classList.add("table", "table-striped", "table-bordered");

            // Iterar sobre las filas de la tabla (excepto la primera que es el encabezado)
            var filas = tabla.getElementsByTagName("tr");
            for (var i = 0; i < filas.length; i++) {
                var fila = filas[i];

                // Aplicar estilos a las filas dependiendo de su clase
                if (fila.classList.contains("table-secondary")) {
                    fila.classList.add("table-secondary");
                } else if (fila.classList.contains("table-light")) {
                    fila.classList.add("table-light");
                }

                // Iterar sobre las celdas de cada fila para aplicar estilos
                var celdas = fila.getElementsByTagName("td");
                for (var j = 0; j < celdas.length; j++) {
                    var celda = celdas[j];

                    // Aplicar clases de Bootstrap o estilos personalizados según sea necesario
                    if (celda.classList.contains("bg-danger")) {
                        celda.classList.add("bg-danger");
                    } else if (celda.classList.contains("bg-warning")) {
                        celda.classList.add("bg-warning");
                    } else if (celda.classList.contains("bg-info")) {
                        celda.classList.add("bg-info");
                    } else if (celda.classList.contains("bg-primary")) {
                        celda.classList.add("bg-primary");
                    } else if (celda.classList.contains("bg-success")) {
                        celda.classList.add("bg-success");
                    } else if (celda.classList.contains("seleccion")) {
                        celda.classList.add("seleccion");
                    }
                }

                // Aplicar estilos a los select dentro de las celdas
                var selects = fila.querySelectorAll("select.form-select.cambiarEstado");
                for (var k = 0; k < selects.length; k++) {
                    selects[k].classList.add("form-select", "cambiarEstado");
                }
            }
        }
    } catch (error) {
        console.error("Error al reactivar los estilos de la tabla:", error);
    }
}

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