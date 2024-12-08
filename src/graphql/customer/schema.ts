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
