const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool(config.mysql_config);

async function query(sql, params) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query(sql, params);
  return rows;
}

function asynQuery(sql, params, callback) {
  pool.getConnection().query(sql, params, callback);
}

module.exports = { query, asynQuery };
