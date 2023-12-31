import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/social_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(chalk.green("MongoDB Connected..."));
  } catch (err) {
    console.error(chalk.red(err.message));
    process.exit(1); // Exit the process with failure
  }
};

const db = mongoose.connection;

export { db, connectDB };
