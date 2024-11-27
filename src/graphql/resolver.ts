import { IResolvers } from "@graphql-tools/utils";
import customerService from "./datasource";

const resolvers: IResolvers = {
  Query: {
    customers: async () => {
      return await customerService.getAllCustomers();
    },
  },
  Mutation: {
    createCustomer: async (_: any, { name }: { name: string }) => {
      return await customerService.createCustomer({ name });
    },
  },
};

export default resolvers;
