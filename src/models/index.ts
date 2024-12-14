import sequelize from "../config/db";
import Customer from "./customer";
import Game from "./game";
import CustomerGame from "./customerGame";
import Payment from "./payment";

const setupAssociations = () => {
  Customer.belongsToMany(Game, {
    through: CustomerGame,
    foreignKey: "customerId",
  });

  Game.belongsToMany(Customer, {
    through: CustomerGame,
    foreignKey: "gameId",
  });

  Payment.belongsTo(Game, {
    foreignKey: "gameId",
  });

  Payment.belongsTo(Customer, {
    foreignKey: "customerId",
  });

  Customer.hasMany(Payment, {
    foreignKey: "customerId",
    as: "payments",
  });

  Game.hasMany(Payment, {
    foreignKey: "gameId",
  });
};

export { sequelize, Customer, Game, CustomerGame, setupAssociations };
