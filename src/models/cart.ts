import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
  } from "sequelize";
import { sequelize } from "./connect";
import CartItems from "./cartItems";
  
  class Cart extends Model<
    InferAttributes<Cart>,
    InferCreationAttributes<Cart>
  > {
    declare id: CreationOptional<number>;
    declare anonymous_token: CreationOptional<string>;
    declare userId: CreationOptional<string>;
    declare storeId: string;
    declare currency: string;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare CartItems: NonAttribute<CartItems[]>;
  }
  
  Cart.init(
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
      tableName: "Cart",
    }
  );

  Cart.hasMany(CartItems, {
    foreignKey: "cartId",
    as: "CartItems",
  });
  
  export default Cart;
  