'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("CartItems", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Cart",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      shippingType: {
        type: Sequelize.STRING,
      },
      shippingPriceAmount: {
        type: Sequelize.DECIMAL(12, 2),
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
    await queryInterface.dropTable("CartItems");
  }
};
