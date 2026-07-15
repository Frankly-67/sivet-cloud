// Ruta: backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Inicializar la conexión a la base de datos
connectDB();

// Instanciar la aplicación Express
const app = express();

app.use(cors()); // Habilita peticiones cruzadas
app.use(express.json()); // Permite al servidor entender cuerpos de peticiones en formato JSON

// Importación de Rutas del Módulo
const appointmentRoutes = require('./routes/appointment.routes');

// Montar enrutadores
app.use('/api/v1/appointments', appointmentRoutes);

// Ruta de comprobación de salud (Healthcheck)
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API de SIVET CLOUD operativa'
    });
});

// Definición del puerto e inicialización de la escucha
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en el puerto ${PORT}`);
});