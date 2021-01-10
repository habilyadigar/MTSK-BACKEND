const { createPool } = require("mysql")
require('dotenv/config')

const pool = createPool({
    host: "mtsk-proje.c9qf5frog2vn.eu-central-1.rds.amazonaws.com",
    port: 3306,
    user: "habil",
    password: "59aws991",
    database: "MTSK",
    connectionLimit:10 
});



//const pool = createPool({
//    host: process.env.DB_HOST,
//    port: process.env.DB_PORT,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASSWORD,
//    database: process.env.DB_NAME,
//    connectionLimit:10 
//});

module.exports = pool;