const express = require('express');
const { createVeterinarian, getVeterinarians } = require('../controllers/veterinarian.controller');

const router = express.Router();

router.route('/')
    .get(getVeterinarians)
    .post(createVeterinarian);

module.exports = router;