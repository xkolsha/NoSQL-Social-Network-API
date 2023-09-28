import express from "express";
import chalk from "chalk";
import db from "./config/connection.js";
import routes from "./routes";

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes setup
app.use(routes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(chalk.red(err.stack));
  res.status(500).send("Something went wrong!");
});

db.once("open", () => {
  const server = app.listen(PORT, () => {
    console.log(chalk.green(`API server running on port ${PORT}!`));
  });

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log(chalk.yellow("\nGracefully shutting down..."));
    server.close(() => {
      console.log(chalk.green("Server closed!"));
      process.exit(0);
    });
  });
});
