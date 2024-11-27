// services/customerService.ts
import db from "../config/db";
const createCustomer = async (customerData) => {
    const { name } = customerData;
    const result = await db.query("INSERT INTO customer (name) VALUES ($1) RETURNING *", [name]);
    return result.rows[0];
};
const getAllCustomers = async () => {
    const result = await db.query("SELECT * FROM customer");
    return result.rows;
};
export default {
    createCustomer,
    getAllCustomers,
};
