import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "1234",
  database: "postgres",
  port: 5431,
});
export default sequelize;
