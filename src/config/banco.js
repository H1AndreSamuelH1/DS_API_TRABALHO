const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password:'JUBI1234',
    database: 'bd_dsapi'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados com êxito!');
});

module.exports = connection;