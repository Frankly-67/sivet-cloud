const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del profesional es obligatorio'],
        trim: true
    },
    specialty: {
        type: String,
        required: [true, 'La especialidad es obligatoria'],
        enum: ['Medicina General', 'Cirugía', 'Dermatología', 'Oftalmología', 'Ortopedia', 'Exóticos'],
        default: 'Medicina General'
    },
    phone: {
        type: String,
        required: [true, 'El teléfono de contacto es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor agregue un correo válido']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Veterinarian', veterinarianSchema);