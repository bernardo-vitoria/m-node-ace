import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "apollo-server-express";
import customerSchema from "./graphql/customer/schema";
import customerResolver from "./graphql/customer/resolver";
import gameSchema from "./graphql/game/schema";
import gameResolver from "./graphql/game/resolver";

console.log(customerResolver, customerSchema);

const server = new ApolloServer<{}>({
  typeDefs: { ...customerSchema, ...gameSchema },
  resolvers: { ...customerResolver, ...gameResolver },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
