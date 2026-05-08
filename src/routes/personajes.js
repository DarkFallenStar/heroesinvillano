'use strict';

const express = require('express');
const { Personaje, Habilidad, PersonajeHabilidad } = require('../../models');
const router = express.Router();

const ctrl = require('../controllers/personajes.controller');

router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', ctrl.create);
router.put('/', ctrl.edit);
router.delete('/:id', ctrl.delete);
router.post('/:id/habilidades', ctrl.addSkill);
router.delete('/:idP/habilidades/:idH', ctrl.deleteSkill);

module.exports = router;