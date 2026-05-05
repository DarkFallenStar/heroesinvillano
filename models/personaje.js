'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Personaje extends Model {
    static associate(models) {
      Personaje.belongsToMany(models.Habilidades, {
        through: models.PersonajeHabilidad,  // sin 's', nombre exacto del modelo
        foreignKey: 'personajeId',
        otherKey: 'habilidadId'
      });
    }
  }

  Personaje.init({
    nombre:      DataTypes.STRING,
    tipo:        DataTypes.STRING,
    descripcion: DataTypes.STRING,
    ataque:      DataTypes.INTEGER,
    defensa:     DataTypes.INTEGER,
    stamina:     DataTypes.INTEGER
   
  }, {
    sequelize,
    modelName: 'Personaje',
  });

  return Personaje;
};