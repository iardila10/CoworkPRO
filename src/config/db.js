//Configurations database
import { crearTabla } from '../data/database.js';
require('dotenv').config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection()
  .then(connection => {
    console.log('MySQL conectado correctamente');
    connection.release();
  })
  .catch(err => {
    console.error('Error conectando a MySQL:', err.message);
  });
