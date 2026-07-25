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

// 1. Importación de archivos de rutas
const appointments = require('./routes/appointment.routes');
const patients = require('./routes/patient.routes'); // <-- Nueva importación
const veterinarians = require('./routes/veterinarian.routes');

// 2. Montaje de los enrutadores en las rutas base
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/patients', patients);
app.use('/api/v1/veterinarians', veterinarians); // <-- Nuevo montaje en la URL base

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