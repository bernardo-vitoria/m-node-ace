import Customer from "../../models/customer"; // Importe o modelo do Sequelize

interface CustomerData {
  id: number;
  name: string;
}

const createCustomer = async (customerData: {
  name: string;
}): Promise<CustomerData> => {
  const { name } = customerData;
  const customer = await Customer.create({ name });
  return customer; // Retorna o novo cliente criado
};

const getAllCustomers = async (): Promise<CustomerData[]> => {
  const customers = await Customer.findAll(); // Busca todos os clientes
  return customers.map((customer) => customer.toJSON()); // Retorna os clientes como objetos
};

export default {
  createCustomer,
  getAllCustomers,
};
