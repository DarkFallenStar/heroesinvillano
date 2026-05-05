const express = require('express');
const { Personaje, Habilidad } = require('../../models');
 
const router = express.Router();
 
router.get('/', async (req, res, next) => {
  try {
    const usuarios = await usuario.findAll({
      include: [{ model: Personaje, through: { attributes: ['nombre','tipo', 'ataque', 'defensa', 'estamina'] } }],
    });
    res.json(usuarios);
  } catch (err) {
    return res.status(500).json({ error: 'aaaaaaaaaaaaaaaa' });
    next(err);
  }
});
 
module.exports = router;