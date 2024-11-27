import customerService from "./datasource";
const resolvers = {
    Query: {
        customers: async () => {
            return await customerService.getAllCustomers();
        },
    },
    Mutation: {
        createCustomer: async (_, { name }) => {
            return await customerService.createCustomer({ name });
        },
    },
};
export default resolvers;
