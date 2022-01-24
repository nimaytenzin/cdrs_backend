require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const pass = encodeURIComponent("covid@2020#")

const connectionString = `postgresql://postgres:${pass}@172.30.20.22:5432/cdrs`;


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});


module.exports = { pool };

