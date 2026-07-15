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

// @desc    Obtener todas las citas médicas activas (Filtrado Lógico)
// @route   GET /api/v1/appointments
// @access  Public (Temporal)
exports.getAppointments = async (req, res) => {
    try {
        // Se inyecta un objeto de filtro en find(). 
        // El operador $ne (Not Equal) excluye los documentos que coincidan con el valor indicado.
        const appointments = await Appointment.find({ status: { $ne: 'Cancelada' } });
        
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
};

// @desc    Actualizar el estado de una cita médica
// @route   PUT /api/v1/appointments/:id
// @access  Public (Temporal)
exports.updateAppointmentStatus = async (req, res) => {
    try {
        // findByIdAndUpdate requiere el ID a buscar, los datos a mutar y las opciones de ejecución
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status },
            {
                new: true, // Instruye a Mongoose a devolver el documento ya modificado
                runValidators: true // Obliga a validar que el nuevo estado cumpla las reglas del esquema
            }
        );

        // Control de excepciones si el identificador no coincide con ningún documento en Atlas
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'El identificador proporcionado no existe en la base de datos'
            });
        }

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};