const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pringles117',
    database: 'burgers_db'
})

connection.connect();

module.exports = connection;