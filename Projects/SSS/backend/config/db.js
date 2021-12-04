require('dotenv').config('../.env');
const mysql = require('mysql2');

//* mysql2 package used to connect to Database
const pool = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD
    host: 'localhost',
    user: 'root',
    database: 'sss',
    password: '1691',
});

//* Here we are exporting this module
module.exports = pool.promise();