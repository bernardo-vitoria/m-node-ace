import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import customerSchema from "./graphql/customer/schema";
import customerResolver from "./graphql/customer/resolver";
console.log(customerResolver, customerSchema);
const server = new ApolloServer({
  typeDefs: customerSchema,
  resolvers: customerResolver,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
