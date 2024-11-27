import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres", // Your database name
  password: "1234", // Your PostgreSQL password
  port: 5431,
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error:", err));

export default client;
