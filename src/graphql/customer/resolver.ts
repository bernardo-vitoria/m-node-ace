import { IResolvers } from "@graphql-tools/utils";
import customerService from "./datasource";

const resolvers: IResolvers = {
  Query: {
    customers: async () => {
      return await customerService.getAllCustomers();
    },
  },
  Mutation: {
    createCustomer: async (
      _: any,
      {
        name,
        tin,
        phoneNumber,
        email,
      }: { name: string; tin: number; phoneNumber?: string; email?: string }
    ) => {
      return await customerService.createCustomer({
        name,
        tin,
        phoneNumber,
        email,
      });
    },
  },
};

export default resolvers;
