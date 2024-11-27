// graphql/customer/datasource.ts
import Game from "../../models/game";
const getAllGames = async () => {
    return await Game.findAll();
};
const createGame = async ({ starttime, endtime, field, }) => {
    return await Game.create({ starttime, endtime, field });
};
export default { getAllGames, createGame };
