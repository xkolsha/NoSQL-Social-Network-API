import mongoose from "mongoose";
import chalk from "chalk";
import { User, Thought } from "../models/index.js";
import { userData, thoughtData } from "./data.js";

import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB using mongoose directly to make sure connection is established in the seeding script.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green("MongoDB Connected..."));
  } catch (err) {
    console.error(chalk.red(err.message));
    process.exit(1); // Exit the process with failure
  }
};

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.create(userData);
    await Thought.create(thoughtData);

    console.log(chalk.greenBright("Database seeded!"));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
};

// Call connection function and then seed the database
connectDB().then(() => {
  seedDatabase();
});
