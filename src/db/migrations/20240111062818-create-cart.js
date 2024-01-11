'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Cart", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      anonymous_token: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("Cart");
  }
};
