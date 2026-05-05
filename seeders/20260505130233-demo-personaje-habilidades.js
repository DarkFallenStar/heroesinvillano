'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const personajes = await queryInterface.sequelize.query(
      'SELECT id FROM Personajes',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const habilidades = await queryInterface.sequelize.query(
      'SELECT id FROM Habilidads',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const relaciones = [];
    personajes.forEach((personaje) => {
      const aleatorias = faker.helpers.arrayElements(habilidades, 3);
      aleatorias.forEach((habilidad) => {
        relaciones.push({
          personajeId: personaje.id,
          habilidadId: habilidad.id,
          nivel:       faker.number.int({ min: 1, max: 10 }),
          createdAt:   new Date(),
          updatedAt:   new Date()
        });
      });
    });

    await queryInterface.bulkInsert('PersonajeHabilidads', relaciones);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PersonajeHabilidads', null, {});
  }
};