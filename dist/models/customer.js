// src/models/customer.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db"; // A conexão com o Sequelize
import CustomerGame from "./customerGame";
import Game from "./game";
class Customer extends Model {
}
Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Passa a instância do sequelize
    modelName: "Customer", // Nome do modelo
    tableName: "customer", // Nome da tabela no banco
    timestamps: false, // Desativa os campos createdAt e updatedAt
});
// Em models/customer.ts
Customer.belongsToMany(Game, {
    through: CustomerGame,
    foreignKey: "customerId",
});
export default Customer;
