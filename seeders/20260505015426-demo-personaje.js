'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {

  async up(queryInterface) {

    // ✅ Primero insertamos habilidades
    const habilidades = Array.from({ length: 5 }).map(() => ({
      nombre:      faker.internet.domainWord(),  
      descripcion: faker.internet.domainName(),   
      incATK:      faker.number.int({ min: 1, max: 50 }),
      incDEF:      faker.number.int({ min: 1, max: 50 }),
      incSTM:      faker.number.int({ min: 1, max: 50 }),
      createdAt:   new Date(),
      updatedAt:   new Date()
    }));

    await queryInterface.bulkInsert('Habilidades', habilidades);

    // ✅ Luego insertamos personajes
    const personajes = Array.from({ length: 10 }).map(() => ({
      nombre:      faker.internet.username(),     
      tipo:        faker.internet.domainSuffix(), 
      descripcion: faker.internet.domainName(),   
      ataque:      faker.number.int({ min: 10, max: 100 }),
      defensa:     faker.number.int({ min: 10, max: 100 }),
      stamina:     faker.number.int({ min: 10, max: 100 }),
      createdAt:   new Date(),
      updatedAt:   new Date()
    }));

    await queryInterface.bulkInsert('Personajes', personajes);
  },

  async down(queryInterface) {
    // ✅ Borramos en orden inverso por las relaciones
    await queryInterface.bulkDelete('Personajes',  null, {});
    await queryInterface.bulkDelete('Habilidades', null, {});
  }

};