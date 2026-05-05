'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    const habilidades = Array.from({ length: 10 }).map(() => ({
      nombre:      faker.internet.domainWord(),
      descripcion: faker.internet.domainName(),
      incATK:      faker.number.int({ min: 1, max: 50 }),
      incDEF:      faker.number.int({ min: 1, max: 50 }),
      incSTM:      faker.number.int({ min: 1, max: 50 }),
      createdAt:   new Date(),
      updatedAt:   new Date()
    }));

    await queryInterface.bulkInsert('Habilidades', habilidades);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habilidades', null, {});
  }
};