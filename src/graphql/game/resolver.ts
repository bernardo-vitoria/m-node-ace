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
            ...customer.toJSON(),
            payments: customer.payments, // Access payments with the alias
          }));

          return {
            ...game.toJSON(),
            customers: enrichedCustomers,
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

      const customerGameEntries = customerIds.map((customerId) => ({
        customerId,
        gameId: game.id,
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
