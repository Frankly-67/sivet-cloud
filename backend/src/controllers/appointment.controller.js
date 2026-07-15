const Appointment = require('../models/appointment.model');

// @desc    Crear una nueva cita médica
// @route   POST /api/v1/appointments
// @access  Public (Temporalmente, se protegerá con JWT luego)
exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        
        res.status(201).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; // <-- Esta llave y punto y coma cierran la primera función correctamente

// @desc    Obtener todas las citas médicas agendadas
// @route   GET /api/v1/appointments
// @access  Public (Temporal)
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error del servidor al obtener las citas'
        });
    }
}; // <-- Cierre de la segunda función