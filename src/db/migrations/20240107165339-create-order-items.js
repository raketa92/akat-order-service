'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
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
          model: "Order",
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
      baseUnitPriceAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      unitDiscountAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      priceAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      discountAmount: {
        type: Sequelize.DECIMAL(12, 2),
      },
      totalAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      shippingPriceAmount: {
        type: Sequelize.DECIMAL(12, 2),
      },
      shippingType: {
        type: Sequelize.STRING,
      },
      logisticCode: {
        type: Sequelize.STRING,
      },
      productLink: {
        type: Sequelize.STRING,
      },
      deliveryStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("OrderItems");
  }
};
