// src/models/customer.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // A conexão com o Sequelize

interface CustomerAttributes {
  id: number;
  name: string;
  tin: number;
  phoneNumber?: number;
  email?: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public email?: string;
  public tin!: number;
  public phoneNumber?: number;
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
  },
  {
    sequelize, // pass instance to sequelize
    modelName: "Customer", // mode name
    tableName: "customer", // database table name
    timestamps: false, // desactive fields createdAt and updatedAt
  }
);

export default Customer;
