const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST, // 'localhost'
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE 
// });

// connection.connect((error)=>{
//     if(error){
//         console.log('El error de conexion es: '+error);
//         return;
//     }
//     console.log('Conectado a la base de datos');
// });

// module.exports = connection;
const connection = mysql.createPool({
    host: process.env.DB_HOST, // 'localhost'
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0 // Número máximo de solicitudes en cola (0 para sin límite)
});

// Obtener una conexión del pool y manejar errores
connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión a la base de datos perdida.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones a la base de datos.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexión a la base de datos rechazada.');
        }
    }

    if (connection) connection.release();

});

// Exportar el pool para que pueda ser usado en otros lugares
module.exports = connection;

