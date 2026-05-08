const { body, validationResult } = require('express-validator');
 
exports.createRules = [
  body('nombre').isString().notEmpty().isLength({ max: 100 })
    .withMessage('El nombre es obligatorio (máx 100 caracteres)'),
  body('tipo').isIn(['guerrero', 'maga', 'elfo', 'asesino'])
    .withMessage('El tipo debe ser: guerrero, maga, elfo o asesino'),
  body('descripcion').optional().isString().isLength({ max: 500 }),
  body('ataque').isInt({ min: 0, max: 100 }),
  body('defensa').isInt({ min: 0, max: 100 }),
  body('estamina').isInt({ min: 0, max: 100 }),
];
 
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
