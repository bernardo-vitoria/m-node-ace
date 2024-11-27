import { Op } from "sequelize";
import Customer from "../../models/customer";
import CustomerGame from "../../models/customerGame";
import Game from "../../models/game";
const resolvers = {
    Mutation: {
        createGame: async (_, { starttime, endtime, field, customerIds, }) => {
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
