require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://postgres:overlord123@127.0.0.1:5432/cdrs`;


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});


module.exports = { pool };

