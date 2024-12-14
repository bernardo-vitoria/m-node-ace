import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Payment {
    id: ID!
    product: String!
    customerId: ID!
    paid: Boolean!
    method: String!
    value: Float!
    gameId: ID
  }

  type Mutation {
    createPayment(
      product: String!
      customerId: ID!
      paid: Boolean!
      method: String!
      value: Float!
      gameId: ID
    ): Payment
  }

  type Query {
    payments: [Payment]
  }
`;

export default typeDefs;
