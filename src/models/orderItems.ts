import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
  } from "sequelize";

import { sequelize } from "./connect";
import Order from "./order";
  
  class OrderItems extends Model<
    InferAttributes<OrderItems>,
    InferCreationAttributes<OrderItems>
  > {
    declare id: CreationOptional<number>;
    declare orderId: ForeignKey<Order["id"]>;
    declare productId: string;
    declare quantity: number;
    declare baseUnitPriceAmount: number;
    declare unitDiscountAmount: number;
    declare priceAmount: number;
    declare discountAmount: number;
    declare totalAmount: number;
    declare shippingPriceAmount: number;
    declare shippingType: string;
    declare logisticCode: string;
    declare productLink: string;
    declare deliveryStatus: string;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
  }
  
  OrderItems.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      baseUnitPriceAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      unitDiscountAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      priceAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      discountAmount: {
        type: DataTypes.DECIMAL(12, 2),
      },
      totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      shippingPriceAmount: {
        type: DataTypes.DECIMAL(12, 2),
      },
      shippingType: {
        type: DataTypes.STRING,
      },
      logisticCode: {
        type: DataTypes.STRING,
      },
      productLink: {
        type: DataTypes.STRING,
      },
      deliveryStatus: {
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
      tableName: "OrderItems",
    }
  );
  
  export default OrderItems;
  