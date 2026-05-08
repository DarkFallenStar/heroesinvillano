'use strict';
const { Personaje, Habilidad, PersonajeHabilidad } = require('../../models');

// GET /api/personajes
exports.list = async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      include: [{
        model: Habilidad,
        through: {
          model: PersonajeHabilidad,
          attributes: ['nivel']
        }
      }]
    });
    res.json(personajes);
  } catch (err) { next(err); }
};

// GET /api/personajes/:id
exports.show = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [{
        model: Habilidad,
        through: {
          model: PersonajeHabilidad,
          attributes: ['nivel']
        }
      }]
    });
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json(personaje);
  } catch (err) { next(err); }
};

// POST /api/personajes
exports.create = async (req, res, next) => {
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
};

// PUT /api/personajes/:id
exports.update = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { nombre, descripcion, ataque, defensa, estamina } = req.body;
    await personaje.update({
      nombre, descripcion,
      ataque:   Number(ataque),
      defensa:  Number(defensa),
      estamina: Number(estamina)
    });
    res.json(personaje);
  } catch (err) { next(err); }
};

// DELETE /api/personajes/:id
exports.destroy = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    await personaje.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};

// POST /api/personajes/:id/habilidades
exports.addHabilidad = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { habilidadId, nivel } = req.body;
    await PersonajeHabilidad.create({ personajeId: personaje.id, habilidadId, nivel });
    res.status(201).json({ mensaje: 'Habilidad agregada correctamente' });
  } catch (err) { next(err); }
};

// DELETE /api/personajes/:idP/habilidades/:idH
exports.removeHabilidad = async (req, res, next) => {
  try {
    const relacion = await PersonajeHabilidad.findOne({
      where: { personajeId: req.params.idP, habilidadId: req.params.idH }
    });
    if (!relacion) return res.status(404).json({ error: 'Relación no encontrada' });
    await relacion.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};