import { Router } from "express";
import { BlogController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validation/blog.validation.js";

const router = Router();

router.post("/", validateRequest(createBlogSchema), BlogController.create);
router.get("/", BlogController.findAll);
router.get("/:id", BlogController.findById);
router.put("/:id", validateRequest(updateBlogSchema), BlogController.update);
router.delete("/:id", BlogController.delete);

export default router;
