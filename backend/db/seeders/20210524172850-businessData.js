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
    return queryInterface.bulkInsert('Businesses', [
      { name:'iLoveSushi', owner_id: 2, address:'7206 2nd St.', city:'Bronx', state:'NY, 10466', phone_number:'(382)522-6429', business_website:'iLoveSushi.com', createdAt:new Date(), updatedAt:new Date()},
      { name:'iSushi', owner_id: 2, address:'561 Columbia Ave.', city:'New York', state:'NY, 10009', phone_number:'(912)713-6898', business_website:'iLoveSushi.com/iSushi', createdAt:new Date(), updatedAt:new Date()},
      { name:'GoFish', owner_id: 3, address:'381 Bayberry Rd.', city:'Flushing', state:'NY, 11354', phone_number:'(267)579-5123', business_website:'GoFish.com', createdAt:new Date(), updatedAt:new Date()},
      { name:'Poké-Bowl', owner_id: 4, address:'47 Columbia Ave.', city:'Brooklyn', state:'NY, 11218', phone_number:'(372)499-6407', business_website:'Poké.com', createdAt:new Date(), updatedAt:new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Businesses', null, {});
  }
};
