// backend/index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 🔍 Logger de todas las peticiones
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Backend está vivo en /!");
});

// Ruta de prueba de BD
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Listar tacos
app.get("/api/tacos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM taco");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tacos:", error);
    res.status(500).json({ error: "Error al obtener tacos." });
  }
});

// Insertar taco
app.post("/api/tacos", async (req, res) => {
  const { sabor, precio, descripcion, fk_local = 1, imagen } = req.body;
  console.log("Datos recibidos taco:", req.body);

  try {
    const result = await pool.query(
      "INSERT INTO taco (sabor, precio, descripcion, fk_local, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sabor, precio, descripcion, fk_local, imagen]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al insertar taco:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Obtener taco por ID
app.get("/api/tacos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM taco WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Taco no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener taco:", error);
    res.status(500).json({ error: "Error al obtener taco." });
  }
});

// Actualizar taco
app.put("/api/tacos/:id", async (req, res) => {
  const { id } = req.params;
  const { sabor, precio, descripcion, fk_local = 1, imagen } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE taco SET
        sabor = $1,
        precio = $2,
        descripcion = $3,
        fk_local = $4,
        imagen = $5
      WHERE id = $6
      RETURNING *;
      `,
      [sabor, precio, descripcion, fk_local, imagen, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Taco no encontrado" });
    }

    res.json({ success: true, taco: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar taco:", error);
    res.status(500).json({ success: false, error: "Error al actualizar taco." });
  }
});

// Eliminar taco
app.delete("/api/tacos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM taco WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Taco no encontrado" });
    }
    res.json({ success: true, message: "Taco eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar taco:", error);
    res.status(500).json({ success: false, error: "Error al eliminar taco" });
  }
});

// Listar locales
app.get("/api/locales", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locales");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener locales:", error);
    res.status(500).json({ error: "Error al obtener locales." });
  }
});

// Insertar local
app.post("/api/locales", async (req, res) => {
  const {
    nombre,
    descripcion,
    calle,
    ciudad,
    codigoPostal,
    estado,
    entreCalles,
    colonia,
    fotoLocal,
    imagenUbicacion,
    fk_vendedor = 1,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO locales (
         nombre_local,
         descripcion,
         calle,
         ciudad,
         codigo_postal,
         estado,
         entre_calles,
         colonia,
         foto_local,
         imagen_ubicacion,
         fk_vendedor
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        nombre,
        descripcion,
        calle,
        ciudad,
        codigoPostal,
        estado,
        entreCalles,
        colonia,
        fotoLocal,
        imagenUbicacion,
        fk_vendedor,
      ]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al insertar local:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// Obtener local por ID
app.get("/api/locales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM locales WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Local no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener local:", error);
    res.status(500).json({ error: "Error al obtener local." });
  }
});

// Actualizar local
app.put("/api/locales/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    calle,
    ciudad,
    codigoPostal,
    estado,
    entreCalles,
    colonia,
    fotoLocal,
    imagenUbicacion,
    fk_vendedor,
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE locales SET
        nombre_local = $1,
        descripcion = $2,
        calle = $3,
        ciudad = $4,
        codigo_postal = $5,
        estado = $6,
        entre_calles = $7,
        colonia = $8,
        foto_local = $9,
        imagen_ubicacion = $10,
        fk_vendedor = $11
      WHERE id = $12
      RETURNING *;
      `,
      [
        nombre,
        descripcion,
        calle,
        ciudad,
        codigoPostal,
        estado,
        entreCalles,
        colonia,
        fotoLocal,
        imagenUbicacion,
        fk_vendedor,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Local no encontrado" });
    }

    res.json({ success: true, local: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar local:", error);
    res.status(500).json({ success: false, error: "Error al actualizar local." });
  }
});

// Eliminar local
app.delete("/api/locales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM locales WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Local no encontrado" });
    }
    res.json({ success: true, message: "Local eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar local:", error);
    res.status(500).json({ success: false, error: "Error al eliminar local" });
  }
});


// 🔐 Login
app.post("/api/login", async (req, res) => {
  const { correo_electronico, contrasena } = req.body;
  console.log("Intento de login:", correo_electronico);

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = $1",
      [correo_electronico]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Correo no encontrado" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      userId: user.id,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Registrar usuario
app.post("/api/usuarios", async (req, res) => {
  const {
    nombre,
    apellidos,
    contacto,
    tipo_usuario,
    calle,
    ciudad,
    codigo_postal,
    correo_electronico,
    contrasena,
    estado_provincia_zona,
    entre_calles,
    foto_perfil = null,
  } = req.body;
  console.log("Datos recibidos usuario:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const query = `
      INSERT INTO usuario (
        nombre, apellidos, contacto, tipo_usuario, calle,
        ciudad, codigo_postal, correo_electronico, contrasena,
        estado_provincia_zona, entre_calles, foto_perfil
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      nombre,
      apellidos,
      contacto,
      tipo_usuario,
      calle,
      ciudad,
      codigo_postal,
      correo_electronico,
      hashedPassword,
      estado_provincia_zona,
      entre_calles,
      foto_perfil,
    ];
    const result = await pool.query(query, values);
    res.json({ success: true, usuario: result.rows[0] });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ success: false, error: "Hubo un problema al registrar el usuario." });
  }
});

// Listar usuarios (resumen)
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nombre, correo_electronico, contacto,
             ciudad, tipo_usuario, foto_perfil
      FROM usuario
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error consultando usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Obtener usuario por ID (detalle completo)
app.get("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
        id, nombre, apellidos, contacto, tipo_usuario,
        calle, ciudad, codigo_postal, correo_electronico,
        contrasena, estado_provincia_zona, entre_calles, foto_perfil
      FROM usuario
      WHERE id = $1
      `,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error consultando usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// Actualizar usuario
app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellidos,
    contacto,
    tipo_usuario,
    calle,
    ciudad,
    codigo_postal,
    correo_electronico,
    contrasena,
    estado_provincia_zona,
    entre_calles,
    foto_perfil,
  } = req.body;
  console.log("Datos actualización usuario:", req.body);

  try {
    let query = `
      UPDATE usuario SET
        nombre = $1,
        apellidos = $2,
        contacto = $3,
        tipo_usuario = $4,
        calle = $5,
        ciudad = $6,
        codigo_postal = $7,
        correo_electronico = $8,
        estado_provincia_zona = $9,
        entre_calles = $10,
        foto_perfil = $11`;
    const values = [
      nombre, apellidos, contacto, tipo_usuario, calle,
      ciudad, codigo_postal, correo_electronico,
      estado_provincia_zona, entre_calles, foto_perfil
    ];

    if (contrasena && contrasena.trim() !== "") {
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      query += `, contrasena = $12 WHERE id = $13 RETURNING *;`;
      values.push(hashedPassword, id);
    } else {
      query += ` WHERE id = $12 RETURNING *;`;
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, usuario: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ success: false, error: "Error al actualizar usuario" });
  }
});

// Eliminar usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM usuario WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ success: false, error: "Error al eliminar usuario" });
  }
});

app.listen(3000, () => {
  console.log("Servidor backend en http://localhost:3000");
});