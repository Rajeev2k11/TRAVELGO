import { Router } from "express";
import { PackageController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createTourPackageSchema,
  updateTourPackageSchema,
} from "../validation/package.validation.js";

const router = Router();

router.post(
  "/",
  validateRequest(createTourPackageSchema),
  PackageController.create
);
router.get("/", PackageController.findAll);
router.get("/:id", PackageController.findById);
router.get("/slug/:slug", PackageController.findBySlug);
router.put(
  "/:id",
  validateRequest(updateTourPackageSchema),
  PackageController.update
);
router.delete("/:id", PackageController.delete);

export default router;
