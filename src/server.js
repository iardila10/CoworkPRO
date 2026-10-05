// 1. Configuración de variables de entorno (Siempre en la primera línea)
import "dotenv/config"; 

import express from "express";
import cors from "cors";
import { User } from "./data/database.js";
import { loginUser, registerUser } from "./controllers/userAuth.js";

const app = express();
const PORT = process.env.PORT || 8000;

// 2. Middlewares globales (SIEMPRE van antes de las rutas)
app.use(cors()); // Permite peticiones desde el frontend (ej. React/Vite)
app.use(express.json()); // Permite leer el cuerpo (body) de las peticiones en formato JSON
app.use(express.urlencoded({ extended: true })); // Permite leer formularios tradicionales
app.use(express.static("public")); // Sirve archivos estáticos

// 3. Rutas del Servidor (Cambiadas a .post para mayor seguridad)
app.post("/register", registerUser); 
app.post("/login", loginUser);

// Ruta de prueba para verificar que el servidor responda
app.get('/', (req, res) => {
  res.json({ message: 'API de autenticación funcionando 🚀' });
});

// 4. Manejo de rutas no encontradas (404 - Siempre al final de todo)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// 5. Arranque del servidor usando la variable de entorno o el puerto 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
