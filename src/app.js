const express = require('express');
const { sequelize } = require('../models');
const personajesRouter  = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/personajes',  personajesRouter);
app.use('/api/habilidades', habilidadesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
  }
})();