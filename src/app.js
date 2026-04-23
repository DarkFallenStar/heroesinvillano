const express = require('express');
const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');

const app = express();
const PORT = 3000;

app.use(express.json()); // parsea JSON en el body

app.use('/personajes', personajesRouter);
app.use('/habilidades', habilidadesRouter);

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Me pica la monda!' });
});
// Middleware genérico de 404 (opcional, buena práctica)

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});