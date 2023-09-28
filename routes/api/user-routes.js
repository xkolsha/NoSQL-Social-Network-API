import { Router } from "express";
import userController from "../../controllers/user-controller.js";

const router = Router();

// Basic user routes
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Fellowship routes (for adding and removing fellowship members)
router
  .route("/:userId/fellowship/:fellowId")
  .post(userController.addFellowshipMember)
  .delete(userController.removeFellowshipMember);

export default router;
