'use strict';
const faker = require('faker');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let users = [];

    let password = bcrypt.hashSync('admin', saltRounds);
    users.push({
      firstname: `Joshua`,
      lastname: `Suatan`,
      email: `admin@admin.com`,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    for (let i = 0; i < 10; i++) {
      let firstname = faker.name.firstName();
      let lastname = faker.name.lastName();
      let email = faker.internet.email();
      let password = bcrypt.hashSync('rahasia', saltRounds);
      users.push({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert(`Users`, users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};