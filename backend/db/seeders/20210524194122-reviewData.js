'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Reviews', [
      { user_id:6, comment:'I LOVE their sushi! However, it took a while to get seated.', rating:4, business_id:1, createdAt:new Date(), updatedAt:new Date()},
      { user_id:6, comment:'This restaurant reminds me of iLoveSushi, so good.', rating:4, business_id:2, createdAt:new Date(), updatedAt:new Date()},
      { user_id:6, comment:'GoFish was disappointing.', rating:3, business_id:3, createdAt:new Date(), updatedAt:new Date()},
      { user_id:6, comment:'My all-time favorite sushi spot!', rating:5, business_id:4, createdAt:new Date(), updatedAt:new Date()},
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
