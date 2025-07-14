// backend/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/tacos', async (req, res) => {
  const { sabor, precio, descripcion } = req.body;
  console.log('Datos recibidos:', req.body);

  try {
    const query = `
      INSERT INTO taco (sabor, precio, descripcion, fk_local)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [sabor, precio, descripcion, 1]; // Puedes cambiar fk_local según convenga

    const result = await pool.query(query, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al insertar taco:', error);
    res.status(500).json({ success: false, error: 'Error al insertar taco.' });
  }
});


app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});
