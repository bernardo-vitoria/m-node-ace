import { IResolvers } from "@graphql-tools/utils";
import customerService from "./datasource";

const resolvers: IResolvers = {
  Query: {
    customers: async () => {
      console.log("MUTATION");
      return await customerService.getAllCustomers();
    },
  },
  Mutation: {
    createCustomer: async (_: any, { name }: { name: string }) => {
      console.log("MUTATION");
      return await customerService.createCustomer({ name });
    },
  },
};

export default resolvers;
