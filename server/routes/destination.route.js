import { Router } from "express";
import { DestinationController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "../validation/destination.validation.js";

const router = Router();

router.post(
  "/",
  validateRequest(createDestinationSchema),
  DestinationController.create
);
router.get("/", DestinationController.findAll);
router.get("/:id", DestinationController.findById);
router.put(
  "/:id",
  validateRequest(updateDestinationSchema),
  DestinationController.update
);
router.delete("/:id", DestinationController.delete);

export default router;
