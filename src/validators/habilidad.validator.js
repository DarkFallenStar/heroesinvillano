'use strict';
const { body, validationResult } = require('express-validator');

// ─── Reglas para POST /api/habilidades ───────────────────────────────────────
exports.createRules = [
  body('nombre')
    .isString().withMessage('El nombre debe ser texto')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar 100 caracteres'),

  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser texto')
    .isLength({ max: 500 }).withMessage('La descripción no puede superar 500 caracteres'),

  body('incremento_ataque')
    .notEmpty().withMessage('El incremento_ataque es obligatorio')
    .isInt({ min: -100, max: 100 }).withMessage('incremento_ataque debe ser un entero entre -100 y 100'),

  body('incremento_defensa')
    .notEmpty().withMessage('El incremento_defensa es obligatorio')
    .isInt({ min: -100, max: 100 }).withMessage('incremento_defensa debe ser un entero entre -100 y 100'),

  body('incremento_estamina')
    .notEmpty().withMessage('El incremento_estamina es obligatorio')
    .isInt({ min: -100, max: 100 }).withMessage('incremento_estamina debe ser un entero entre -100 y 100'),
];

// ─── Reglas para PUT /api/habilidades/:id ────────────────────────────────────
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

  body('incremento_ataque')
    .optional()
    .isInt({ min: -100, max: 100 }).withMessage('incremento_ataque debe ser un entero entre -100 y 100'),

  body('incremento_defensa')
    .optional()
    .isInt({ min: -100, max: 100 }).withMessage('incremento_defensa debe ser un entero entre -100 y 100'),

  body('incremento_estamina')
    .optional()
    .isInt({ min: -100, max: 100 }).withMessage('incremento_estamina debe ser un entero entre -100 y 100'),
];

// ─── Manejador de errores (se encadena después de las reglas) ─────────────────
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};