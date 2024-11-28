// src/graphql/game/resolver.ts
import { IResolvers } from "@graphql-tools/utils";
import Game from "../../models/game"; // Importe o modelo do Sequelize

const resolvers: IResolvers = {
  Query: {
    games: async () => {
      return await Game.findAll(); // Busca todos os jogos
    },
  },
  Mutation: {
    createGame: async (
      _: any,
      {
        starttime,
        endtime,
        field,
      }: { starttime: string; endtime: string; field: string }
    ) => {
      return await Game.create({ starttime, endtime, field }); // Cria um novo jogo
    },
  },
};

export default resolvers;
