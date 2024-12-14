import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Game {
    id: ID!
    starttime: String!
    endtime: String!
    field: String!
    customers: [CustomerDetails!]!
  }

  type CustomerDetails {
    id: ID!
    name: String!
    tin: Int!
    phoneNumber: Int!
    email: String!
    payments: [Payment]
  }

  type Payment {
    id: ID!
    product: String!
    paid: Boolean!
    method: String!
    value: Float!
  }

  type Mutation {
    createGame(
      starttime: String!
      endtime: String!
      field: String!
      customerIds: [ID!]! # Lista de IDs de jogadores
    ): Game
  }

  type Query {
    games: [Game]
  }
`;

export default typeDefs;
