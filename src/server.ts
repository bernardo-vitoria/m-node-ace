import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import customerSchema from "./graphql/customer/schema";
import customerResolver from "./graphql/customer/resolver";
import gameSchema from "./graphql/game/schema";
import gameResolver from "./graphql/game/resolver";
import { paymentSchema } from "./graphql/payment";
import { paymentResolver } from "./graphql/payment";
import sequelize from "./config/db";
import { setupAssociations } from "./models";

const startServer = async () => {
  try {
    // Set up Sequelize associations between models
    setupAssociations();

    // database connection
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database schema
    await sequelize.sync({ alter: true });

    console.log("Database synchronized successfully.");
    console.log("\n\n\n Creating ApolloServer...");

    const server = new ApolloServer<{}>({
      typeDefs: [customerSchema, gameSchema, paymentSchema],
      resolvers: [customerResolver, gameResolver, paymentResolver],
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
