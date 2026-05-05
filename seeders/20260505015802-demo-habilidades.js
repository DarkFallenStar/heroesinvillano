'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const habilidades = Array.from({ length: 10 }).map(() => ({
      nombre:              faker.internet.domainWord(),
      descripcion:         faker.lorem.sentence(),
      incremento_ataque:   faker.number.int({ min: 1, max: 50 }),
      incremento_defensa:  faker.number.int({ min: 1, max: 50 }),
      incremento_estamina: faker.number.int({ min: 1, max: 50 }),
      createdAt:           new Date(),
      updatedAt:           new Date()
    }));

    await queryInterface.bulkInsert('Habilidads', habilidades);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Habilidads', null, {});
  }
};