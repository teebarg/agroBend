"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "FreshFood",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vegetables",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Groceries",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fruits",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Meat & Fish",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
