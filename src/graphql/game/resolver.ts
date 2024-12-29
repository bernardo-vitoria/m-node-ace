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
      const games = GameDatasource.getAllGames();

      return games;
    },
    booking: async () => {
      const customergames = await CustomerGame.findAll();

      // Group by gameId
      const gamesMap = new Map();

      for (const customergame of customergames) {
        if (!gamesMap.has(customergame.gameId)) {
          gamesMap.set(customergame.gameId, []);
        }

        const customer = await Customer.findByPk(customergame.customerId);

        if (customer) {
          const payment = await Payment.findOne({
            where: {
              customerId: customer.id,
              gameId: customergame.gameId,
            },
          });

          gamesMap.get(customergame.gameId).push({
            ...customer.toJSON(),
            payment: payment || null,
          });
        }
      }

      // Convert to GameGroupList with details of the game
      return Promise.all(
        Array.from(gamesMap.entries()).map(async ([gameId, customers]) => {
          const game = await Game.findByPk(gameId);

          return {
            game: game ? game.toJSON() : null,
            customers,
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
        value: 1,
        gameId: game.id,
      }));

      const payments = await Payment.bulkCreate(paymentsEntries);
      const customerGameEntries = customerIds.map((customerId) => ({
        customerId,
        gameId: game.id,
        paymentId: payments.find((p) => p.gameId === game.id)!.id,
        value: 1,
        subscription: "none",
        paid: false,
        name: "nameless",
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
