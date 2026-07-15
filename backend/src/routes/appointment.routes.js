const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointment.controller');

const router = express.Router();

// Enrutamiento encadenado para la misma URL base
router.route('/')
    .get(getAppointments)
    .post(createAppointment);

module.exports = router;