// services/customerService.ts
import db from "../config/db";

interface Customer {
  id: number;
  name: string;
}

const createCustomer = async (customerData: { name: string }) => {
  console.log("createCustomer");
  const { name } = customerData;
  const result = await db.query(
    "INSERT INTO customer (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

const getAllCustomers = async () => {
  console.log("getAllCustomers");
  const result = await db.query("SELECT * FROM customer");
  return result.rows;
};

export default {
  createCustomer,
  getAllCustomers,
};
