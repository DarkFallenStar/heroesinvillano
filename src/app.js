require('dotenv').config();
const express = require('express');
const { sequelize } = require('../models');

const personajesRouter  = require('./routes/personajes');
const usuariosRouter    = require('./routes/usuarios');
const habilidadesRouter = require('./routes/habilidades');
const requestLogger = require('./middlewares/requestLogger');
const sanitizeIds = require('./middlewares/sanitizeIds');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(sanitizeIds)
app.use('/api/personajes',  personajesRouter);
app.use('/api/usuarios',    usuariosRouter);
app.use('/api/habilidades', habilidadesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ✅ try/catch para ver el error real
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Error al arrancar:', error.message); // ✅ esto mostrará qué falla
    process.exit(1);
  }
})();