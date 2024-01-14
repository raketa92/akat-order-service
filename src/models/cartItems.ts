import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
  } from "sequelize";

import { sequelize } from "./connect";
import Cart from "./cart";
  
  class CartItems extends Model<
    InferAttributes<CartItems>,
    InferCreationAttributes<CartItems>
  > {
    declare id: CreationOptional<number>;
    declare cartId: ForeignKey<Cart["id"]>;
    declare productId: string;
    declare quantity: number;
    declare shippingType: CreationOptional<string>;
    declare shippingPriceAmount: CreationOptional<number>;
    declare currency: string;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
  }
  
  CartItems.init(
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
      shippingType: {
        type: DataTypes.STRING,
      },
      shippingPriceAmount: {
        type: DataTypes.DECIMAL(12, 2),
      },
      currency: {
        type: DataTypes.STRING(5),
        allowNull: false,
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
      tableName: "CartItems",
    }
  );
  
  export default CartItems;
  