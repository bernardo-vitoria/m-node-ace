import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/db";
class CustomerGame extends Model {
}
CustomerGame.init({
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
}, {
    sequelize,
    modelName: "CustomerGame",
    tableName: "customerGame",
    timestamps: false,
});
export default CustomerGame;
