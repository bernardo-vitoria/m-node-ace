import { IResolvers } from "@graphql-tools/utils";
import customerService from "./datasource";
import { Customer } from "../../models";
import Payment from "../../models/payment";
import { Model } from "sequelize";

const resolvers: IResolvers = {
  Query: {
    customers: async () => {
      return await customerService.getAllCustomers();
    },
    customersWithPayments: async () => {
      const customers = await Customer.findAll();

      return await Promise.all(
        customers.map(async (customer) => {
          const payments = await Payment.findAll({
            include: [
              {
                model: Customer,
                where: { id: customer.id },
                required: false,
              },
            ],
          });

          return {
            ...customer.toJSON(),
            payments,
          };
        })
      );
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
        subscription,
      }: {
        name: string;
        tin: number;
        phoneNumber?: number;
        email?: string;
        subscription?: string;
      }
    ) => {
      return await customerService.createCustomer({
        name,
        tin,
        phoneNumber,
        subscription,
        email,
      });
    },
  },
};

export default resolvers;
