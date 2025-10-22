/*##################################################################################################################################################
####################################################################################################################################################
################################################################    KAVIJA DULMITH    ##############################################################
################################################################       16/08/2025     ##############################################################
####################################################################################################################################################
####################################################################################################################################################*/

// src/app/db.js
import sql from 'mssql';

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Optional: for full control (e.g., stored procedure calls with input/output)
export async function connectToDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Connection error:', err);
    throw err;
  }
}

// Simple: for running plain SQL queries
export async function queryDatabase(query) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset || [];
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

export { sql };

// DONE AND DUSTED 16-08-2025