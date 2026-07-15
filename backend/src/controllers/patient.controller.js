const Patient = require('../models/patient.model');

// @desc    Registrar un nuevo paciente en el sistema
// @route   POST /api/v1/patients
// @access  Public (Temporal)
exports.createPatient = async (req, res) => {
    try {
        // Intercepta el cuerpo de la petición y lo inserta validando contra el esquema
        const patient = await Patient.create(req.body);
        
        res.status(201).json({
            success: true,
            data: patient
        });
    } catch (error) {
        // Captura errores de validación (ej. falta de nombre o teléfono inválido)
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Obtener el registro completo de pacientes
// @route   GET /api/v1/patients
// @access  Public (Temporal)
exports.getPatients = async (req, res) => {
    try {
        // Recupera todos los documentos de la colección 'patients'
        const patients = await Patient.find();
        
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error del servidor al obtener el listado de pacientes'
        });
    }
};