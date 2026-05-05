'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Habilidades extends Model {
    static associate(models) {
      Habilidades.belongsToMany(models.Personaje, {
        through: models.PersonajeHabilidad,  // ✅ nombre exacto del modelo
        foreignKey: 'habilidadId',
        otherKey: 'personajeId'
      });
    }
  }

  Habilidades.init({
    // ❌ quitamos 'id' manual, Sequelize lo genera automáticamente
    nombre:      DataTypes.STRING,
    descripcion: DataTypes.STRING,
    incATK:      DataTypes.INTEGER,
    incDEF:      DataTypes.INTEGER,
    incSTM:      DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Habilidades',
  });

  return Habilidades;
};