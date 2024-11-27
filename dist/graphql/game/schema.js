import { gql } from "apollo-server-express";
const typeDefs = gql `
  type Game {
    id: ID!
    starttime: String!
    endtime: String!
    field: String!
    customers: [Customer!]! # Relacionamento com jogadores
  }

  type Mutation {
    createGame(
      starttime: String!
      endtime: String!
      field: String!
      customerIds: [ID!]! # Lista de IDs de jogadores
    ): Game
  }
`;
export default typeDefs;
