import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    tin: Int!
    phoneNumber: Int
    email: String
  }

  type Query {
    customers: [Customer]
  }

  type Payment {
    id: ID!
    product: String!
    paid: Boolean!
    method: String!
    value: Float!
    gameId: ID
  }

  type Customer {
    id: ID!
    name: String!
    tin: Int!
    phoneNumber: Int
    email: String
    subscription: String
    payments: [Payment!]!
  }

  type Query {
    customersWithPayments: [Customer!]! # Query que retorna todos os clientes com pagamentos
  }

  type Mutation {
    createCustomer(
      name: String!
      tin: Int!
      phoneNumber: Int
      email: String
    ): Customer
  }
`;

export default typeDefs;
