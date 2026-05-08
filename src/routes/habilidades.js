'use strict';
const express = require('express');
const ctrl    = require('../controllers/habilidades.controller');
const {
  createRules,
  updateRules,
  handleValidationErrors
} = require('../validators/habilidad.validator');

const router = express.Router();

router.get('/',    ctrl.list);
router.get('/:id', ctrl.show);

// POST → validar → cortar si hay errores → controller
router.post('/',
  createRules,
  handleValidationErrors,
  ctrl.create
);

// PUT → validar → cortar si hay errores → controller
router.put('/:id',
  updateRules,
  handleValidationErrors,
  ctrl.update
);

router.delete('/:id', ctrl.destroy);

module.exports = router;