import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Booking {
    id: ID!
    customerId: ID!
    gameId: ID!
    paymentId: ID
    value: Float
    subscription: String
    name: String
    paid: Boolean
  }

  type GameBooking {
    gameId: ID!
    bookings: [Booking!]!
  }

  type Query {
    bookingsGroupedByGameId: [GameBooking!]! # Query to return bookings grouped by game id
  }

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
    phoneNumber: Int
    email: String
    payment: Payment
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
    payment: Payment # Pagamento associado ao jogo
  }

  type Game {
    id: ID!
    starttime: String!
    endtime: String!
    field: String!
  }

  type GameGroup {
    game: Game!
    customers: [Customer!]!
  }

  type Query {
    booking: [GameGroup!]!
  }

  type Query {
    games: [Game]
  }

  type Query {
    bookingByGameId(gameId: ID): GameGroup # Retorna um booking específico pelo ID
  }
`;

export default typeDefs;
