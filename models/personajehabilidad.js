'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PersonajeHabilidad extends Model {
    static associate(models) {
      // La tabla intermedia generalmente no necesita asociaciones propias
      // pero si quieres acceder a datos extra (nivel), puedes agregarlas aquí
      PersonajeHabilidad.belongsTo(models.Personaje,   { foreignKey: 'personajeId' });
      PersonajeHabilidad.belongsTo(models.Habilidades, { foreignKey: 'habilidadId' });
    }
  }

  PersonajeHabilidad.init({
    personajeId:  DataTypes.INTEGER,  // ✅ nombres consistentes con las asociaciones
    habilidadId:  DataTypes.INTEGER,
    nivel:        DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PersonajeHabilidad',
  });

  return PersonajeHabilidad;
};