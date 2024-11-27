import { gql } from "apollo-server-express";
const typeDefs = gql `
  type Customer {
    id: ID!
    name: String!
  }

  type Query {
    customers: [Customer]
  }

  type Mutation {
    createCustomer(name: String!): Customer
  }
`;
export default typeDefs;
