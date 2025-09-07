const {pool } = require("pg");
require("dotenv").config();

const pool = new pool ({

    user: process.env.PGUSER ,
    password : process.env.PGPASSWORD,
    host : process.env.PGHOST,
    PORT: process.env.PGPORT,
    database : process.env.PGDATABASE
})

module.exports= pool;