'use strict';
const express = require('express');
const { Personaje, Habilidad, PersonajeHabilidad } = require('../../models');
const router = express.Router();

// GET /api/personajes
router.get('/', async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      include: [{
        model: Habilidad,
        through: {
          model: PersonajeHabilidad, // ✅ especifica el modelo explícitamente
          attributes: ['nivel']
        }
      }]
    });
    res.json(personajes);
  } catch (err) { next(err); }
});


// GET /api/personajes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [{
        model: Habilidad,
        through: {
          model: PersonajeHabilidad, // ✅ especifica el modelo explícitamente
          attributes: ['nivel']
        }
      }]
    });
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json(personaje);
  } catch (err) { next(err); }
});

// POST /api/personajes
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, ataque, defensa, estamina, perfilId } = req.body;
    const nuevo = await Personaje.create({
      nombre, descripcion,
      ataque:   Number(ataque),
      defensa:  Number(defensa),
      estamina: Number(estamina),
      perfilId
    });
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
});

// PUT /api/personajes/:id
router.put('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { nombre, descripcion, ataque, defensa, estamina } = req.body;
    await personaje.update({ nombre, descripcion,
      ataque: Number(ataque), defensa: Number(defensa), estamina: Number(estamina)
    });
    res.json(personaje);
  } catch (err) { next(err); }
});

// DELETE /api/personajes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    await personaje.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

// POST /api/personajes/:id/habilidades
router.post('/:id/habilidades', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { habilidadId, nivel } = req.body;
    await PersonajeHabilidad.create({ personajeId: personaje.id, habilidadId, nivel });
    res.status(201).json({ mensaje: 'Habilidad agregada correctamente' });
  } catch (err) { next(err); }
});

// DELETE /api/personajes/:idP/habilidades/:idH
router.delete('/:idP/habilidades/:idH', async (req, res, next) => {
  try {
    const relacion = await PersonajeHabilidad.findOne({
      where: { personajeId: req.params.idP, habilidadId: req.params.idH }
    });
    if (!relacion) return res.status(404).json({ error: 'Relación no encontrada' });
    await relacion.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;