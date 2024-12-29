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
    bookingByGameId: async (_: any, { gameId }) => {
      const customerGames = await CustomerGame.findAll({
        where: { gameId },
      });

      const game = await Game.findByPk(gameId);

      if (!game) throw new Error(`No game found for id ${gameId}`);

      const customers = await Promise.all(
        customerGames.map(async (customergame) => {
          const customer = await Customer.findByPk(customergame.customerId);

          const payment = customer
            ? await Payment.findOne({
                where: {
                  customerId: customer.id,
                  gameId: customergame.gameId,
                },
              })
            : null;

          return customer
            ? {
                ...customer.toJSON(),
                payment: payment || null,
              }
            : null;
        })
      );

      return {
        game: game.toJSON(),
        customers: customers.filter((c) => c !== null),
      };
    },
    bookingsGroupedByGameId: async () => {
      const bookings = await CustomerGame.findAll();

      const gamesMap = new Map();

      bookings.forEach((booking) => {
        if (!gamesMap.has(booking.gameId)) {
          gamesMap.set(booking.gameId, []);
        }
        gamesMap.get(booking.gameId).push(booking);
      });

      return Array.from(gamesMap.entries()).map(([gameId, bookings]) => ({
        gameId,
        bookings,
      }));
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
