// Ruta: backend/src/models/appointment.model.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'El identificador del paciente es obligatorio']
    },
    veterinarianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El identificador del veterinario asignado es obligatorio']
    },
    date: {
        type: Date,
        required: [true, 'La fecha y hora de la cita son obligatorias']
    },
    duration: {
        type: Number,
        default: 30, // Duración estándar de la consulta
        min: [15, 'La duración mínima permitida es de 15 minutos']
    },
    reason: {
        type: String,
        required: [true, 'El motivo de la consulta es obligatorio'],
        trim: true,
        maxLength: [250, 'El motivo no puede exceder los 250 caracteres']
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'],
        default: 'Pendiente'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    // Configuración adicional: añade automáticamente los campos createdAt y updatedAt
    timestamps: true 
});

module.exports = mongoose.model('Appointment', appointmentSchema);