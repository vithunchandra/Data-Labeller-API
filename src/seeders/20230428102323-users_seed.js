'use strict';

const {faker} = require('@faker-js/faker');
const {generateRandomAlphanum} = require('../utils/util');

const users = [];
const roles = ["requester", "labeller"];
for(let i=0; i<100; i++){
  const name = faker.name.firstName();
  const username = `${name}${i}`
  const email = `${username}@gmail.com`;
  const role = roles[Math.floor(Math.random() * 2)];
  const password = generateRandomAlphanum(5);
  const saldo = 0
  users.push({
    username,
    password,
    name,
    email,
    role,
    saldo
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users", users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {truncate: true});
  }
};
