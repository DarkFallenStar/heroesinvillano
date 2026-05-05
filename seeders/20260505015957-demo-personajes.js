// seeders/XXXXXXXXXXXXXX-demo-usuarios.js
const { faker } = require('@faker-js/faker');
 
module.exports = {
  async up(queryInterface) {
    const personajes = Array.from({ length: 10 }).map(() => ({
      nombre: faker.internet.username(),
      descripcion: faker.internet.email(),
      ataque: Math.random(),
      defensa: Math.random(),
      estamina: Math.random(),
      perfilId: Math.floor(Math.random() * 10),
      usuarioId: Math.floor(Math.random() * 30),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Personajes', personajes);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Personajes', null, {});
  },
};
