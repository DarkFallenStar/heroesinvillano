'use strict';
const express = require('express');
const ctrl    = require('../controllers/personajes.controller');
const {
  createRules,
  updateRules,
  addHabilidadRules,
  handleValidationErrors
} = require('../validators/personaje.validator');

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

// POST habilidad → validar → cortar si hay errores → controller
router.post('/:id/habilidades',
  addHabilidadRules,
  handleValidationErrors,
  ctrl.addHabilidad
);

router.delete('/:idP/habilidades/:idH', ctrl.removeHabilidad);

module.exports = router;