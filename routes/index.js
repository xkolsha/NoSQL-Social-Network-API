import { Router } from "express";
import chalk from "chalk";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/api", apiRoutes);

router.use((req, res) => {
  console.log(
    chalk.red("[ERROR]"),
    chalk.yellow("Wrong route accessed:", req.path)
  );
  return res.status(404).send("Wrong route!");
});

export default router;
