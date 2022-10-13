require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const pass = encodeURIComponent("*Dhs@2022#")

const connectionString = `postgresql://root:${pass}@192.168.20.87:5432/cdrs`;


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});


module.exports = { pool };

