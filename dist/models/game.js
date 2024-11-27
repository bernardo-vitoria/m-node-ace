// models/game.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db"; // Importa a instância do Sequelize
import CustomerGame from "./customerGame";
import Customer from "./customer";
class Game extends Model {
}
Game.init({
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
}, {
    sequelize, // Passando a instância do Sequelize
    modelName: "Game",
    tableName: "game",
    timestamps: false,
});
Game.belongsToMany(Customer, {
    through: CustomerGame,
    foreignKey: "gameId",
});
export default Game;
