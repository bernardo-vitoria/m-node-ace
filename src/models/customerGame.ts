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
  declare id?: number; // Torna o campo opcional
  declare customerId: number;
  declare gameId: number;
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
      allowNull: false,
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
