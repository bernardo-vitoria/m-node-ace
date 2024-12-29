import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/db";

class CustomerGame extends Model<
  InferAttributes<CustomerGame>,
  InferCreationAttributes<CustomerGame>
> {
  declare id?: number;
  declare customerId: number;
  declare gameId: number;
  declare paymentId: number;
  declare value: number;
  declare name: string;
  declare paid: boolean;
  declare subscription: string;
}

CustomerGame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subscription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "CustomerGame",
    tableName: "customergame",
    timestamps: false,
  }
);

export default CustomerGame;
