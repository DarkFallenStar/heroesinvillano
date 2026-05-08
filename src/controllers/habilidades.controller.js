const { Habilidad } = require('../../models');

// GET /api/habilidades?orden=ataque|defensa|estamina
router.get('/', async (req, res, next) => {
  try {
    const { orden } = req.query;
    const order = [];
    if (orden === 'ataque')   order.push(['incremento_ataque',   'DESC']);
    if (orden === 'defensa')  order.push(['incremento_defensa',  'DESC']);
    if (orden === 'estamina') order.push(['incremento_estamina', 'DESC']);

    const habilidades = await Habilidad.findAll({ order });
    res.json(habilidades);
  } catch (err) { next(err); }
});

// GET /api/habilidades/:id
router.get('/:id', async (req, res, next) => {
  try {
    const habilidad = await Habilidad.findByPk(req.params.id);
    if (!habilidad) return res.status(404).json({ error: 'Habilidad no encontrada' });
    res.json(habilidad);
  } catch (err) { next(err); }
});

// POST /api/habilidades
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, incremento_ataque, incremento_defensa, incremento_estamina } = req.body;
    const nueva = await Habilidad.create({
      nombre, descripcion,
      incremento_ataque:   Number(incremento_ataque),
      incremento_defensa:  Number(incremento_defensa),
      incremento_estamina: Number(incremento_estamina)
    });
    res.status(201).json(nueva);
  } catch (err) { next(err); }
});

// PUT /api/habilidades/:id
router.put('/:id', async (req, res, next) => {
  try {
    const habilidad = await Habilidad.findByPk(req.params.id);
    if (!habilidad) return res.status(404).json({ error: 'Habilidad no encontrada' });
    const { nombre, descripcion, incremento_ataque, incremento_defensa, incremento_estamina } = req.body;
    await habilidad.update({
      nombre, descripcion,
      incremento_ataque:   Number(incremento_ataque),
      incremento_defensa:  Number(incremento_defensa),
      incremento_estamina: Number(incremento_estamina)
    });
    res.json(habilidad);
  } catch (err) { next(err); }
});

// DELETE /api/habilidades/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const habilidad = await Habilidad.findByPk(req.params.id);
    if (!habilidad) return res.status(404).json({ error: 'Habilidad no encontrada' });
    await habilidad.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;