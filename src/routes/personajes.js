// src/routes/personajes.js
const express = require('express');
const { Personaje, Habilidad } = require('../../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const personajes = await Personaje.findAll({
            include: [{ model: Habilidad, through: { attributes: ['nivel'] } }],
        });
        res.json(personajes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

// GET /api/personajes/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const personaje = await Personaje.findByPk(id, {
            include: [{ model: Habilidad, through: { attributes: ['nivel'] } }],
        });

        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        res.json(personaje);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {

        const personaje = await Personaje.create({
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            ataque: Number(req.body.ataque),
            defensa: Number(req.body.defensa),
            estamina: Number(req.body.estamina),
            habilidades: req.body.habilidades.split(",").map(h => Number(h))
        });

        res.status(201).json(personaje);
    } catch (err) {
        next(err);
    }

});

router.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const personaje = await Personaje.findByPk(id);

        if (!personaje) {
            return res.status(404).json({ error: 'personaje no encontrado' });
        }

        await personaje.update({
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            ataque: Number(req.body.ataque),
            defensa: Number(req.body.defensa),
            estamina: Number(req.body.estamina),
            habilidades: req.body.habilidades.split(",").map(h => Number(h))
        });

        res.status(200).json(personaje);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const personaje = await Personaje.findByPk(id);

        await personaje.destroy({
            where: { id: id }
        });

        res.status(200).json("Eliminoads");
    }
    catch (err) {
        next(err);
    }
});


/*router.get('/', (req, res) => {

    const { nombre, tipo } = req.query;
    let resultado = personajes;

    if (nombre) {
        const n = nombre.toLowerCase();
        resultado = resultado.filter(p => p.nombre.toLowerCase().includes(n));
    }

    if (tipo) {
        const n = tipo.toLowerCase();
        resultado = resultado.filter(p => p.tipo.toLowerCase().includes(n));
    }

    res.status(200).json(resultado);
});




// POST /api/personajes


// GET /api/personajes/:id/habilidades — ruta jerárquica

router.get('/:id/habilidades', (req, res) => {

    const id = Number(req.params.id);
    const personaje = personajes.find(p => p.id === id);

    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    const suyas = habilidades.filter(h => personaje.habilidades.includes(h.id));

    res.status(200).json(suyas);

});

/*
router.get('/', (req, res) => {

    const { nombre, tipo } = req.query;

    let resultado = personajes;

    if (nombre) {
        resultado = resultado.filter(
            p => p.nombre && p.nombre.toLowerCase() === nombre.toLowerCase()
        );
    }

    if (tipo) {
        resultado = resultado.filter(
            p => p.tipo && p.tipo.toLowerCase() === tipo.toLowerCase()
        );
    }

    if (resultado.length === 0) {
        return res.status(404).json({ error: 'personaje no encontrado' });
    }

    res.status(200).json(resultado);
});

/*router.get('/', (req, res) => {

    const nombre = req.query.nombre;
    const personaje = personajes.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!personaje) {
        return res.status(404).json({ error: 'personaje no encontrado' });
    }

    res.status(200).json(personaje);
});

router.get('/amo', (req, res) => {

    const tipo = req.query.tipo;
    const personaje = personajes.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());

    if (!personaje) {
        return res.status(404).json({ error: 'personaje no encontrado' });
    }

    res.status(200).json(personaje);
    module.exports = router;
});*/

// Implementa router.put('/:id', ...) y router.delete('/:id', ...).

