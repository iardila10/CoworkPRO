import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


app.listen(8000, ()=>
    console.log("Server running")
);

// Rutas


// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de autenticación funcionando 🚀' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});