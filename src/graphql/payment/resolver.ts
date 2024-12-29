import Payment from "../../models/payment";
import datasource from "./datasource";

type CreatePaymentArgs = {
  product: string;
  customerId: number;
  paid: boolean;
  method: string;
  value: number;
  gameId?: number;
};

export const paymentResolver = {
  Query: {
    payments: async () => {
      return await datasource.getAllPayments();
    },
  },
  Mutation: {
    createPayment: async (_: any, args: CreatePaymentArgs) => {
      try {
        return await datasource.createPayment(args);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
    },
    paid: async (_: any, args: { method: string; paymentId: string }) => {
      const payment = await Payment.findByPk(args.paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      payment.paid = true;
      payment.method = args.method;

      await payment.save();

      return payment;
    },
  },
};

export default paymentResolver;
