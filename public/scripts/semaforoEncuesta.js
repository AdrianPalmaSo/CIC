
document.addEventListener('DOMContentLoaded', function() {
    // Obtén todas las celdas con la clase 'estado-celda'
    let celdas = document.querySelectorAll('.estado-encuesta');

    // Itera sobre cada celda
    celdas.forEach(function(celda) {
        // Obtiene el valor del estado desde el atributo 'data-estado'
        let estado = celda.getAttribute('data-estado');

        obtenerColorEstado(estado, function(color) {
            // Agrega la clase de estilo correspondiente al color obtenido
            celda.style.backgroundColor = color;
        });
    });

    // Función para obtener el color correspondiente al estado
    function obtenerColorEstado(estado, callback) {
        let colores = {
            'Regular': '#FFDA6A',
            'Excelente': '#008f39',
            'Buena': '#3AE261',
            'Mala': '#F53D4F'    // Rojo
        };
        // Llama al callback con el color correspondiente al estado
        callback(colores[estado] || ''); // Si el estado no tiene un color asignado, usa una cadena vacía
    }
});