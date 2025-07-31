// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'first_tacos', // reemplaza con tu usuario real
  host: 'localhost',
  database: 'tacoscanasta', // reemplaza con el nombre real
  password: 'tacosdecanasta2025',
  port: 5432,
});

module.exports = pool;


