const mysql = require('mysql2');

//MySQL db connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },

  );

  module.exports = db;