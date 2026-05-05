'use strict';
const express = require('express');
const { Personaje, Habilidades } = require('../../models'); // ✅ Mayúsculas, así se llaman los modelos
const router = express.Router();

// GET /api/personajes?nombre=&tipo=
router.get('/', async (req, res) => {
  try {
    const { nombre, tipo } = req.query;

    // Construimos el filtro dinámicamente
    const where = {};
    if (nombre) where.nombre = nombre;
    if (tipo)   where.tipo   = tipo;

    const personajes = await Personaje.findAll({ where });

    res.status(200).json(personajes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/personajes/:id
router.get('/:id', async (req, res) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/personajes
router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, descripcion, ataque, defensa, stamina } = req.body;

    const nuevo = await Personaje.create({
      nombre,
      tipo,
      descripcion,
      ataque:  Number(ataque),
      defensa: Number(defensa),
      stamina: Number(stamina)
    });

    res.status(201).json(nuevo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/personajes/:id
router.put('/:id', async (req, res) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    const { nombre, tipo, descripcion, ataque, defensa, stamina } = req.body;

    await personaje.update({
      nombre,
      tipo,
      descripcion,
      ataque:  Number(ataque),
      defensa: Number(defensa),
      stamina: Number(stamina)
    });

    res.status(200).json(personaje);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/personajes/:id
router.delete('/:id', async (req, res) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    await personaje.destroy(); // ✅ destroy() elimina el registro de la BD

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/personajes/:id/habilidades
router.get('/:id/habilidades', async (req, res) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [{ model: Habilidades }] // ✅ Sequelize hace el JOIN automáticamente
    });

    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje.Habilidades); // ✅ accedemos a las habilidades del personaje

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;