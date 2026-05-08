'use strict';
const { body, validationResult } = require('express-validator');

// ─── Reglas para POST /api/personajes ────────────────────────────────────────
exports.createRules = [
  body('nombre')
    .isString().withMessage('El nombre debe ser texto')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar 100 caracteres'),

  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser texto')
    .isLength({ max: 500 }).withMessage('La descripción no puede superar 500 caracteres'),

  body('ataque')
    .notEmpty().withMessage('El ataque es obligatorio')
    .isInt({ min: 0, max: 200 }).withMessage('El ataque debe ser un entero entre 0 y 200'),

  body('defensa')
    .notEmpty().withMessage('La defensa es obligatoria')
    .isInt({ min: 0, max: 200 }).withMessage('La defensa debe ser un entero entre 0 y 200'),

  body('estamina')
    .notEmpty().withMessage('La estamina es obligatoria')
    .isInt({ min: 0, max: 200 }).withMessage('La estamina debe ser un entero entre 0 y 200'),

  body('perfilId')
    .optional()
    .isInt({ min: 1 }).withMessage('El perfilId debe ser un entero positivo'),
];

// ─── Reglas para PUT /api/personajes/:id ─────────────────────────────────────
exports.updateRules = [
  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar 100 caracteres'),

  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser texto')
    .isLength({ max: 500 }).withMessage('La descripción no puede superar 500 caracteres'),

  body('ataque')
    .optional()
    .isInt({ min: 0, max: 200 }).withMessage('El ataque debe ser un entero entre 0 y 200'),

  body('defensa')
    .optional()
    .isInt({ min: 0, max: 200 }).withMessage('La defensa debe ser un entero entre 0 y 200'),

  body('estamina')
    .optional()
    .isInt({ min: 0, max: 200 }).withMessage('La estamina debe ser un entero entre 0 y 200'),
];

// ─── Reglas para POST /api/personajes/:id/habilidades ────────────────────────
exports.addHabilidadRules = [
  body('habilidadId')
    .notEmpty().withMessage('El habilidadId es obligatorio')
    .isInt({ min: 1 }).withMessage('El habilidadId debe ser un entero positivo'),

  body('nivel')
    .notEmpty().withMessage('El nivel es obligatorio')
    .isInt({ min: 1, max: 10 }).withMessage('El nivel debe ser un entero entre 1 y 10'),
];

// ─── Manejador de errores (se encadena después de las reglas) ─────────────────
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};