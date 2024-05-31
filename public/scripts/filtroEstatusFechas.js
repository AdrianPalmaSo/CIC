document.getElementById('filtroFormEstatus').addEventListener('submit', async function(event) {
    event.preventDefault();

    const desdeFecha = document.getElementById('input_desde_status').value;
    const hastaFecha = document.getElementById('input_hasta_status').value;

    try {
        const response = await fetch('/filtroFechaEstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ desdeFecha, hastaFecha }),
        });

        if (!response.ok) {
            throw new Error('Error al filtrar datos');
        }

        const data = await response.json();
        construirYActualizarTabla(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

function construirYActualizarTabla(data) {
    // Construir la tabla dinámicamente
    const newTable = construirTablaDinamica(data);

    // Obtener el contenedor actual de la tabla
    const tablaContainer = document.getElementById('tablaContainer');

    // Limpiar el contenedor antes de agregar la nueva tabla
    tablaContainer.innerHTML = '';

    // Agregar la nueva tabla al contenedor
    tablaContainer.appendChild(newTable);
}

function construirTablaDinamica(data) {
    const { abierto, asignada, pendiente, espera, cerrado } = data;
    const newTable = document.createElement('table');
    newTable.className = 'table'; // Clase principal
    newTable.id = 'estatusTabla'; // ID principal

    // Para cancelar --bs-table-bg: transparent;
    newTable.style.setProperty('--bs-table-bg', 'aliceblue', 'important');

    // Fila de encabezados principales
    const headerRowMain = document.createElement('tr');
    headerRowMain.className = 'tableEstatus'; // Clase de fila principal

        // Abierto
        const abiertoHeader = document.createElement('th');
        abiertoHeader.setAttribute('colspan', '5');
        abiertoHeader.className = 'tablaTitulos'; // Clase de encabezado
        abiertoHeader.textContent = 'Abierto';
        abiertoHeader.style.padding = '8px'; // Agregar padding de 8px
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
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Folio</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Nombre</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Equipo</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Fecha</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;" id="bordeD">Estatus</th>
        `;

        // Asignadas
        headerRowColumns.innerHTML += `
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Folio</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Nombre</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Técnico</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;" id="bordeDer">Estatus</th>
        `;

        // En Proceso
        headerRowColumns.innerHTML += `
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Folio</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Nombre</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Equipo</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;" id="bordeDer">Estatus</th>
        `;

        // En Espera
        headerRowColumns.innerHTML += `
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Folio</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Nombre</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Equipo</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;" id="bordeDer">Estatus</th>
        `;

        // Cerrado
        headerRowColumns.innerHTML += `
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Folio</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Nombre</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;">Equipo</th>
        <th style="padding: 8px; background-color: #e2e3e5; color: rgb(0, 0, 0, 0.6) !important;" id="bordeDer">Estatus</th>
        `;



        newTable.appendChild(headerRowMain);
        newTable.appendChild(headerRowColumns);

        // Cuerpo de la tabla
        const maxLength = Math.max(abierto.length, asignada.length, pendiente.length, espera.length, cerrado.length);

        for (let i = 0; i < maxLength; i++) {
            const row = document.createElement('tr');

            // Abierto
            if (i < abierto.length) {
                row.innerHTML += `
                    <td class="bg-danger" style="padding: 8px;">${abierto[i].FolioSolicitud}</td>
                    <td class="bg-danger">${abierto[i].Nombre}</td>
                    <td class="bg-danger">${abierto[i].Equipo}</td>
                    <td class="bg-danger">${abierto[i].Fecha}</td>
                    <td class="seleccion bg-danger" id="bordeDerecho<%= i %>">
                        <select class="form-select cambiarEstado" data-folio="${abierto[i].FolioSolicitud}" style="padding: .375rem 2.0rem .375rem .40rem;">
                            <option value="Abierto" selected>Abierto</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td></td><td id="bordeDerechoVacio"></td>';
            }

            // Asignadas
            if (i < asignada.length) {
                row.innerHTML += `
                    <td class="bg-warning">${asignada[i].FolioSolicitud}</td>
                    <td class="bg-warning">${asignada[i].UsuarioNombre}</td>
                    <td class="bg-warning">${asignada[i].Nombre}</td>
                    <td class="seleccion bg-warning" id="ladoDerecho<%= i %>" >
                        <select class="form-select cambiarEstado" data-folio="${asignada[i].FolioSolicitud}" style="padding: .375rem 2.0rem .375rem .40rem;">
                            <option value="Asignada" selected>Asignada</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td id="ladoDerechoVacio"></td>';
            }

            // En Proceso
            if (i < pendiente.length) {
                row.innerHTML += `
                    <td class="bg-info">${pendiente[i].FolioSolicitud}</td>
                    <td class="bg-info">${pendiente[i].Nombre}</td>
                    <td class="bg-info">${pendiente[i].Equipo}</td>
                    <td class="seleccion bg-info" id="pendienteDerecha<%= i %>">
                        <select class="form-select cambiarEstado" data-folio="${pendiente[i].FolioSolicitud}" style="padding: .375rem 2.0rem .375rem .40rem;">
                            <option value="Proceso" selected>En Proceso</option>
                            <option value="Abierto">Abierto</option>
                            <option value="Espera">En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td id="pendienteVacioDerecha"></td>';
            }

            // En Espera
            if (i < espera.length) {
                row.innerHTML += `
                    <td class="bg-primary">${espera[i].FolioSolicitud}</td>
                    <td class="bg-primary">${espera[i].Nombre}</td>
                    <td class="bg-primary">${espera[i].Equipo}</td>
                    <td class="seleccion bg-primary" id="esperarDerecha<%= i %>">
                        <select class="form-select cambiarEstado" data-folio="${espera[i].FolioSolicitud}" style="padding: .375rem 2.0rem .375rem .40rem;">
                            <option value="Proceso">En Proceso</option>
                            <option value="Abierto">Abierto</option>
                            <option value="Espera" selected>En Espera</option>
                            <option value="Cerrado">Cerrado</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td><td id="esperaVacioDerecha"></td>';
            }

            // Cerrado
            if (i < cerrado.length) {
                row.innerHTML += `
                    <td class="bg-success">${cerrado[i].FolioSolicitud}</td>
                    <td class="bg-success">${cerrado[i].Nombre}</td>
                    <td class="bg-success">${cerrado[i].Equipo}</td>
                    <td class="seleccion bg-success" id="ladoDerecho<%= i %>" >
                        <select class="form-select cambiarEstado" data-folio="${cerrado[i].FolioSolicitud}" style="padding: .375rem 2.0rem .375rem .40rem;">
                            <option value="Cerrado" selected>Cerrado</option>
                            <option value="Proceso">En Proceso</option>
                            <option value="Espera">En Espera</option>
                            <option value="Asignada">Asignada</option>
                        </select>
                    </td>
                `;
            } else {
                row.innerHTML += '<td></td><td></td><td></td>';
            }

            newTable.appendChild(row);
        }
        // Reemplazar la tabla antigua con la nueva
        const oldTable = document.getElementById('estatusTabla');
        oldTable.parentNode.replaceChild(newTable, oldTable);
        // Llamar a la función para activar los estilos de la tabla
        

    return newTable;
}
