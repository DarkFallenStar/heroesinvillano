'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const perfiles = await queryInterface.sequelize.query(
      'SELECT id FROM Perfils',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const personajes = perfiles.flatMap((perfil) =>
      Array.from({ length: 2 }).map(() => ({
        nombre:      faker.internet.username(),
        descripcion: faker.lorem.sentence(),
        ataque:      faker.number.int({ min: 10, max: 100 }),
        defensa:     faker.number.int({ min: 10, max: 100 }),
        estamina:    faker.number.int({ min: 10, max: 100 }),
        perfilId:    perfil.id,
        createdAt:   new Date(),
        updatedAt:   new Date()
      }))
    );

    await queryInterface.bulkInsert('Personajes', personajes);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};