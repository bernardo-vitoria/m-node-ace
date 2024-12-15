import { Op } from "sequelize";
import Customer from "../../models/customer";
import CustomerGame from "../../models/customerGame";
import { IResolvers } from "@graphql-tools/utils";
import Game from "../../models/game";
import GameDatasource from "./datasource";
import Payment from "../../models/payment";

const resolvers: IResolvers = {
  Query: {
    games: async (_: any, {}) => {
      const games = await GameDatasource.getAllGames();

      return await Promise.all(
        games.map(async (game) => {
          const customers = await Customer.findAll({
            include: [
              {
                model: Payment,
                as: "payments",
                where: { gameId: game.id },
                required: false,
              },
            ],
          });

          const enrichedCustomers = customers.map((customer) => ({
            id: customer.id,
            name: "BONECO", // Use placeholder de acordo com contexto
            tin: customer.tin,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            payment:
              customer
                .toJSON()
                .payments?.find((payment) => payment.gameId === game.id) ||
              null,
          }));

          console.log("enrichedCustomers", enrichedCustomers); // Verifique dados aqui

          return {
            ...game.toJSON(),
            customers: enrichedCustomers, // Garanta que o retorno inclui todos os dados
          };
        })
      );
    },
  },
  Mutation: {
    createGame: async (
      _: any,
      {
        starttime,
        endtime,
        field,
        customerIds,
      }: {
        starttime: string;
        endtime: string;
        field: string;
        customerIds: number[];
      }
    ) => {
      const game = await Game.create({ starttime, endtime, field });

      const paymentsEntries = customerIds.map((customerId) => ({
        customerId,
        product: "game",
        paid: false,
        method: "none",
        value: 0,
        gameId: game.id,
      }));

      const payments = await Payment.bulkCreate(paymentsEntries);
      const customerGameEntries = customerIds.map((customerId) => ({
        customerId,
        gameId: game.id,
        paymentId: payments.find((p) => p.gameId === game.id)?.id,
      }));

      await CustomerGame.bulkCreate(customerGameEntries);

      return game;
    },
  },
  Game: {
    customers: async (game) => {
      // Busca os relacionamentos CustomerGame
      const customerGames = await CustomerGame.findAll({
        where: { gameId: game.id },
      });

      // Extrai os IDs de customers
      const customerIds = customerGames.map((cg) => cg.customerId);

      // Busca os customers correspondentes
      return Customer.findAll({
        where: {
          id: {
            [Op.in]: customerIds, // Busca pelos IDs
          },
        },
      });
    },
  },
};

export default resolvers;
