// models/game.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // Importa a instância do Sequelize

interface GameAttributes {
  id: number;
  starttime: string;
  endtime: string;
  field: string;
}

interface GameCreationAttributes extends Optional<GameAttributes, "id"> {}

class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: number;
  public starttime!: string;
  public endtime!: string;
  public field!: string;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    starttime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Passando a instância do Sequelize
    modelName: "Game",
    tableName: "game",
    timestamps: false,
  }
);

export default Game;
