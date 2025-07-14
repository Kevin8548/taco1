// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // reemplaza con tu usuario real
  host: 'localhost',
  database: 'tacoscanasta', // reemplaza con el nombre real
  password: 'k888',
  port: 5432,
});

module.exports = pool;
