const Veterinarian = require('../models/veterinarian.model');

// @desc    Registrar un nuevo veterinario
// @route   POST /api/v1/veterinarians
exports.createVeterinarian = async (req, res) => {
    try {
        const veterinarian = await Veterinarian.create(req.body);
        res.status(201).json({ success: true, data: veterinarian });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Obtener lista de veterinarios activos
// @route   GET /api/v1/veterinarians
exports.getVeterinarians = async (req, res) => {
    try {
        const veterinarians = await Veterinarian.find({ isActive: true });
        res.status(200).json({ success: true, count: veterinarians.length, data: veterinarians });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};