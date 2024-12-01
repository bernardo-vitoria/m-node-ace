import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "apollo-server-express";
import customerSchema from "./graphql/customer/schema";
import customerResolver from "./graphql/customer/resolver";
import gameSchema from "./graphql/game/schema";
import gameResolver from "./graphql/game/resolver";
import sequelize from "./config/db"; // Conexão com o Sequelize
import { setupAssociations } from "./models"; // Função para configurar associações

console.log(customerResolver, customerSchema);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Configurar as associações do Sequelize entre os modelos
    setupAssociations();

    // Testar a conexão com o banco de dados
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    // Sincronizar o banco de dados
    await sequelize.sync({ alter: true }); // Sincronizar o esquema
    console.log("Banco de dados sincronizado com sucesso.");

    console.log("\n\n\n Creating ApolloServer...");

    // Criar o servidor Apollo
    const server = new ApolloServer<{}>({
      typeDefs: [customerSchema, gameSchema],
      resolvers: [customerResolver, gameResolver],
    });

    // Iniciar o servidor Apollo
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
