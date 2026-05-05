'use strict';
const express = require('express');
const { Habilidades, Personaje } = require('../../models'); // ✅ desde models de Sequelize
const router = express.Router();

// GET /api/habilidades?orden=estamina
router.get('/', async (req, res) => {
  try {
    const { orden } = req.query;

    // Campos válidos para ordenar
    const camposValidos = ['incATK', 'incDEF', 'incSTM'];

    // Construimos el order dinámicamente
    const order = [];
    if (orden === 'ataque')  order.push(['incATK', 'DESC']);
    if (orden === 'defensa') order.push(['incDEF', 'DESC']);
    if (orden === 'estamina') order.push(['incSTM', 'DESC']);

    const habilidades = await Habilidades.findAll({ order });

    res.status(200).json(habilidades);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/habilidades/:id
router.get('/:id', async (req, res) => {
  try {
    const habilidad = await Habilidades.findByPk(req.params.id);

    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    res.status(200).json(habilidad);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habilidades
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, incATK, incDEF, incSTM } = req.body;

    const nueva = await Habilidades.create({
      nombre,
      descripcion,
      incATK: Number(incATK),
      incDEF: Number(incDEF),
      incSTM: Number(incSTM)
    });

    res.status(201).json(nueva);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const habilidad = await Habilidades.findByPk(req.params.id);

    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    const { nombre, descripcion, incATK, incDEF, incSTM } = req.body;

    await habilidad.update({
      nombre,
      descripcion,
      incATK: Number(incATK),
      incDEF: Number(incDEF),
      incSTM: Number(incSTM)  
    });

    res.status(200).json(habilidad);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const habilidad = await Habilidades.findByPk(req.params.id);

    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    await habilidad.destroy();

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id/personajes', async (req, res) => {
  try {
    const habilidad = await Habilidades.findByPk(req.params.id, {
      include: [{ model: Personaje }] 
    });

    if (!habilidad) {
      return res.status(404).json({ error: 'Habilidad no encontrada' });
    }

    res.status(200).json(habilidad.Personajes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;