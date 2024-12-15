import Customer from "../../models/customer"; // Importe o modelo do Sequelize

interface CustomerData {
  id: number;
  name: string;
  tin: number;
  phoneNumber?: number;
  email?: string;
  subscription?: string;
}

const createCustomer = async (customerData: {
  name: string;
  tin: number;
  phoneNumber?: number;
  email?: string;
  subscription?: string;
}): Promise<CustomerData> => {
  const { name, tin } = customerData;
  const customer = await Customer.create({
    name,
    tin,
    phoneNumber: customerData?.phoneNumber,
    email: customerData?.email,
    subscription: customerData?.subscription,
  });
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
