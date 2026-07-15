// Ruta: backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Intento de conexión utilizando la variable de entorno
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error.message}`);
        // Detener el proceso con fallo si no hay base de datos, el sistema no puede operar sin persistencia
        process.exit(1);
    }
};

module.exports = connectDB;