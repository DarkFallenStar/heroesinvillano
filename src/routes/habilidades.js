// GET /api/habilidades?orden=estamina
const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');
const router = express.Router();


router.get('/', (req, res) => {

    const { orden } = req.query;
    let resultado = [...habilidades];

    if (orden === 'estamina') {
        resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
    }
    else{
        return res.status(404).json({ error: 'Mala URL' });
    }

    res.status(200).json(resultado);
});
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);
    const habilidad = habilidades.find(p => p.id === id);

    if (!habilidad) {
        return res.status(404).json({ error: 'habilidad no encontrado' });
    }

    res.status(200).json(habilidad);
});

router.put('/:id', (req, res) => {

    const id = Number(req.params.id);
    const habilidad = habilidades.find(p => p.id === id);

    if (!habilidad) {
        return res.status(404).json({ error: 'habilidad no encontrado' });
    }
    
    habilidad.nombre = req.body.nombre
    habilidad.descripcion = req.body.descripcion
    habilidad.incremento_ataque = Number(req.body.incremento_ataque)
    habilidad.incremento_defensa = Number(req.body.incremento_defensa)
    habilidad.incremento_estamina = -Number(req.body.incremento_estamina)

    res.status(200).json(habilidad);
});

module.exports = router;