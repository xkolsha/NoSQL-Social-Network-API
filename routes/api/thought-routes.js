import { Router } from "express";
import thoughtController from "../../controllers/thought-controller.js";

const router = Router();

// Basic thought routes
router
  .route("/")
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route("/:id")
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// Reaction-related routes
router.route("/:thoughtId/reactions").post(thoughtController.createReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(thoughtController.deleteReaction);

export default router;
