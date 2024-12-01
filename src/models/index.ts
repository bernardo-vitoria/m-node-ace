import sequelize from "../config/db"; // Instância do Sequelize
import Customer from "./customer";
import Game from "./game";
import CustomerGame from "./customerGame";

// Definir associações
const setupAssociations = () => {
  Customer.belongsToMany(Game, {
    through: CustomerGame,
    foreignKey: "customerId",
  });

  Game.belongsToMany(Customer, {
    through: CustomerGame,
    foreignKey: "gameId",
  });
};

// Exportar todos os modelos
export { sequelize, Customer, Game, CustomerGame, setupAssociations };
