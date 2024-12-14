import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // Import Sequelize instance

interface PaymentAttributes {
  id: number;
  product: string;
  customerId: number;
  paid: boolean;
  method: string;
  gameId?: number;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public product!: string;
  public customerId!: number;
  public paid!: boolean;
  public method!: string;
  public value!: number;
  public gameId?: number;
}

// Initialize the Payment model
Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT, // Use FLOAT for currency values
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass Sequelize instance
    modelName: "Payment",
    tableName: "payment",
    timestamps: false,
  }
);

export default Payment;
