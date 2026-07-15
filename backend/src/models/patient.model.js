const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del paciente es obligatorio'],
        trim: true,
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    species: {
        type: String,
        required: [true, 'La especie anatómica es obligatoria'],
        enum: ['Canino', 'Felino', 'Ave', 'Reptil', 'Exótico', 'Otro']
    },
    breed: {
        type: String,
        default: 'Mestizo',
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'La edad (en años o meses) es obligatoria'],
        min: [0, 'La edad no puede ser un valor negativo']
    },
    ownerName: {
        type: String,
        required: [true, 'El nombre del propietario es obligatorio'],
        trim: true
    },
    ownerContact: {
        type: String,
        required: [true, 'El teléfono de contacto es obligatorio'],
        match: [/^\d{7,10}$/, 'Por favor ingrese un número de teléfono válido (7 a 10 dígitos)']
    }
}, {
    timestamps: true // Inyecta automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Patient', patientSchema);