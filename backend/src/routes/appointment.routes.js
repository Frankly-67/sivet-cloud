const express = require('express');
const { createAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointment.controller');

const router = express.Router();

// Enrutamiento para transacciones que operan sobre toda la colección
router.route('/')
    .get(getAppointments)
    .post(createAppointment);

// Enrutamiento para transacciones que operan sobre un documento específico
router.route('/:id')
    .put(updateAppointmentStatus);

module.exports = router;