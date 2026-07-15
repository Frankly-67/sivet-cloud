const express = require('express');
const { createPatient, getPatients } = require('../controllers/patient.controller');

const router = express.Router();

// Enrutamiento estándar REST para la colección de pacientes
router.route('/')
    .get(getPatients)
    .post(createPatient);

module.exports = router;