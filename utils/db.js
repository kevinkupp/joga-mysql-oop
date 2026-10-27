const mysql = require("mysql2");

const connection = mysql
    .createPool({
        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        database: 'joga_mysql'
    })
    .promise();

module.exports = connection;
