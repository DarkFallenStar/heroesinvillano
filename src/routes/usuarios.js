const express = require('express');
const { Usuario, Personaje, Habilidad } = require('../../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Personaje, through: { attributes: ['nivel'] } }],
    });

    res.json(usuarios);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/personajes', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Personaje
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'usuario no encontrado' });
    }

    res.json(usuario.Personajes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;