const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');
const router = express.Router();

// GET /api/personajes?nombre=&tipo=
router.get('/', (req, res) => {

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

// GET /api/personajes/:id
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);
    const personaje = personajes.find(p => p.id === id);

    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }

    res.status(200).json(personaje);
});


// POST /api/personajes
router.post('/', (req, res) => {

    const nuevo = { id: personajes.length + 1, ...req.body,
         nombre: req.body.nombre,
         tipo: req.body.tipo,
         descripcion: req.body.descripcion,
         ataque: Number(req.body.ataque),
         defensa: Number(req.body.defensa),
         estamina: Number(req.body.estamina),
         habilidades: req.body.habilidades.split(",").map(h => Number(h))
     };
    personajes.push(nuevo);
    res.status(201).json(nuevo);
});


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

router.delete('/:id', (req, res) => {

    const id = Number(req.params.id);
    const personaje = personajes.find(p => p.id === id);

    if (!personaje) {
        return res.status(404).json({ error: 'personaje no encontrado' });
    }

    personajes.splice(personaje, 1)

    res.status(204).send(personajes);
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
});*/

// Implementa router.put('/:id', ...) y router.delete('/:id', ...).

module.exports = router;