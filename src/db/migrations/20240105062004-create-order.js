'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      anonymous_token: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
      },
      storeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      cardProvider: {
        type: Sequelize.SMALLINT,
      },
      paymentType: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      deliveryDate: {
        type: Sequelize.DATE,
      },
      deliveryLocationId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.TEXT,
      },
      deliveryTimeId: {
        type: Sequelize.SMALLINT,
      },
      deliveryPriceAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      shippingPriceAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      priceAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      discountAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
      },
      checkoutToken: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      contactPhone: {
        type: Sequelize.STRING,
      },
      languageCode: {
        type: Sequelize.STRING,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
      },
      note: {
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
    await queryInterface.dropTable("Order");
  }
};
