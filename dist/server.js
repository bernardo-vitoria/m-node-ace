import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "apollo-server-express";
import customerSchema from "./graphql/schema";
// Defina um schema básico
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
console.log(customerSchema);
// Defina os resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};
// Crie o servidor Apollo e use o Express
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
/* // Definindo a porta do servidor
app.listen(4000, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
 */
console.log(`🚀  Server ready at: ${url}`);
