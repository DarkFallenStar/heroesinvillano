'use strict';
const express = require('express');
const ctrl    = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/:id/personajes', ctrl.getPersonajes);

module.exports = router;