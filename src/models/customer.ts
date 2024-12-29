// src/models/customer.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // A conexão com o Sequelize
import Payment from "./payment";
import CustomerGame from "./customerGame";

interface CustomerAttributes {
  id: number;
  name: string;
  subscription?: string;
  tin: number;
  phoneNumber?: number;
  email?: string;
  payments?: Payment[];
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public subscription?: string;
  public email?: string;
  public tin!: number;
  public phoneNumber?: number;
  public payments?: Payment[];
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // pass instance to sequelize
    modelName: "Customer", // mode name
    tableName: "customer", // database table name
    timestamps: false, // desactive fields createdAt and updatedAt
  }
);

Customer.afterUpdate(async (customer, options) => {
  await CustomerGame.update(
    { subscription: customer.subscription, name: customer.name },
    { where: { customerId: customer.id } }
  );
});

export default Customer;
