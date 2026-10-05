import 'dotenv/config';
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise"

// Crear la tabla automáticamente si no existe
export const crearTabla = async () => {
     const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      user VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') DEFAULT 'user',
      activo BOOLEAN DEFAULT TRUE,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.execute(sql);
  console.log('Tabla users lista');
};

crearTabla();

export const User = {
  async create({ name, user, email, password, role}) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users (name, user, email, password, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, usuario, email, hashedPassword, documento || null, grado || null, rol || 'estudiante']
    );

    return result.insertId;
  },

  async SearchforEmailandUser(email, password) {
    let sql, params;

    if (email) {
      sql = 'SELECT * FROM users WHERE email = ?';
      params = [email];
    } else {
      sql = 'SELECT * FROM users WHERE password = ?';
      params = [password];
    }

    const [rows] = await pool.execute(sql, params);
    return rows[0];
  },

  async exists(email, password) {
    const [rows] = await pool.execute(
      'SELECT id FROM users WHERE email = ? OR usuario = ?',
      [email, password]
    );
    return rows.length > 0;
  },

  async comparePassword(passwordPlane, passwordHash) {
    return await bcrypt.compare(passwordPlane, passwordHash);
  }
};
