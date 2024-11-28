import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Game {
    id: ID!
    starttime: String!
    endtime: String!
    field: String!
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
  }

  type Mutation {
    createGame(starttime: String!, endtime: String!, field: String!): Game
  }
`;

export default typeDefs;
