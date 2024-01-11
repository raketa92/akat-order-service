import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
  } from "sequelize";
import { sequelize } from "./connect";
import OrderItems from "./orderItems";
  
  class Order extends Model<
    InferAttributes<Order>,
    InferCreationAttributes<Order>
  > {
    declare id: CreationOptional<number>;
    declare anonymous_token: CreationOptional<string>;
    declare userId: CreationOptional<string>;
    declare storeId: string;
    declare currency: string;
    declare orderNumber: string;
    declare orderStatus: string;
    declare cardProvider: CreationOptional<number>;
    declare paymentType: number;
    declare deliveryDate: CreationOptional<Date>;
    declare deliveryLocationId: number;
    declare deliveryAddress: CreationOptional<string>;
    declare deliveryTimeId: CreationOptional<number>;
    declare deliveryPriceAmount: number;
    declare shippingPriceAmount: number;
    declare priceAmount: number;
    declare discountAmount: number;
    declare totalAmount: number;
    declare token: CreationOptional<string>;
    declare checkoutToken: CreationOptional<string>;
    declare fullName: CreationOptional<string>;
    declare contactPhone: CreationOptional<string>;
    declare languageCode: CreationOptional<string>;
    declare isPaid: CreationOptional<boolean>;
    declare note: CreationOptional<string>;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare OrderItems: NonAttribute<OrderItems>;
  }
  
  Order.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      anonymous_token: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
      },
      storeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      cardProvider: {
        type: DataTypes.SMALLINT,
      },
      paymentType: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      deliveryDate: {
        type: DataTypes.DATE,
      },
      deliveryLocationId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.TEXT,
      },
      deliveryTimeId: {
        type: DataTypes.SMALLINT,
      },
      deliveryPriceAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      shippingPriceAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      priceAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      discountAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
      checkoutToken: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      contactPhone: {
        type: DataTypes.STRING,
      },
      languageCode: {
        type: DataTypes.STRING,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
      },
      note: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize: sequelize,
      tableName: "Order",
    }
  );

  Order.hasMany(OrderItems, {
    foreignKey: "orderId",
    as: "OrderItems",
  });
  
  export default Order;
  