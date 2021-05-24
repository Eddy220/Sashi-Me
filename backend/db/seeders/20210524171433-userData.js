'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username:'demo', email:'demo@user.com', hashed_password:bcrypt.hashSync('password'), about_me:'I am a demo user.', createdAt:new Date(), updatedAt:new Date()},
      { username:'iLoveSushi', email:'iLoveSushi@iLoveSushi.com', hashed_password:bcrypt.hashSync('password'), about_me:'Hello, I am the owner of iLoveSushi', createdAt:new Date(), updatedAt:new Date()},
      { username:'iSushi', email:'iSushi@iLoveSushi.com', hashed_password:bcrypt.hashSync('password'), about_me:'Welcome to iLoveSushi child branch, iSushi!.', createdAt:new Date(), updatedAt:new Date()},
      { username:'GoFish', email:'GoFish@GoFish.com', hashed_password:bcrypt.hashSync('password'), about_me:'Go Fish', createdAt:new Date(), updatedAt:new Date()},
      { username:'Poke-Bowl', email:'pokebowl@Poké.com', hashed_password:bcrypt.hashSync('password'), about_me:'Sushi maker.', createdAt:new Date(), updatedAt:new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo', 'iLoveSushi', 'iSushi', 'GoFish', 'Poke-Bowl'] }
    }, {});
  }
};
