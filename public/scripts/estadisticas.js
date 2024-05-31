
document.getElementById("generarEstadisticasBtn").addEventListener("click", function() {
    // Obtener los datos de las fechas y el tipo de solicitud
    const tipo = document.getElementById("input_tipo").value;
    const desdeFecha = document.getElementById("input_Desde").value;
    const hastaFecha = document.getElementById("input_Hasta").value;
    // Enviar los datos al servidor
    fetch('/generarEstadisticas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, desdeFecha, hastaFecha })
    })
    .then(response => {
        if (response.ok) {
            // Redirigir a la nueva vista de estadísticas
            window.location.href = '/estadisticas';
        } else {
            console.error('Error al generar estadísticas');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById("generarReportesBtn").addEventListener("click", function() {
    // Obtener los datos de las fechas y el tipo de solicitud
    const tipo = document.getElementById("input_tipo").value;
    const desdeFecha = document.getElementById("input_Desde").value;
    const hastaFecha = document.getElementById("input_Hasta").value;
    const titulo = document.getElementById("input_Titulo").value;
    const nombre = document.getElementById("input_Nombre").value;
    const oficio = document.getElementById("input_Oficio").value;
    const exp = document.getElementById("input_Expediente").value;
    const area = document.getElementById("input_Area").value;

    // Enviar los datos al servidor
    fetch('/generarReportes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, desdeFecha, hastaFecha, titulo, nombre, oficio, exp, area })
    })
    .then(response => {
        if (response.ok) {
            // Redirigir a la nueva vista de estadísticas
            window.location.href = '/reportes';
        } else {
            console.error('Error al generar reportes');
        }
    })
    .catch(error => console.error('Error:', error));
});