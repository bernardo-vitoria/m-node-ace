// src/models/customer.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // A conexão com o Sequelize

interface CustomerAttributes {
  id: number;
  name: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
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
  },
  {
    sequelize, // Passa a instância do sequelize
    modelName: "Customer", // Nome do modelo
    tableName: "customer", // Nome da tabela no banco
    timestamps: false, // Desativa os campos createdAt e updatedAt
  }
);

export default Customer;
