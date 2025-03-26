import { Router } from "express";
import { BlogController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validation/blog.validation.js";

const router = Router();

/**
 * @description Create a new blog post.
 * @param {object} req.body - The request body containing blog details.
 * @returns {object} The created blog object.
 */
router.post("/", validateRequest(createBlogSchema), BlogController.create);

/**
 * @description Retrieve all blog posts from the database.
 * @returns {object[]} An array of all blog posts.
 */
router.get("/", BlogController.findAll);

/**
 * @description Retrieve a single blog post by ID.
 * @param {string} id - The ID of the blog post.
 * @returns {object} The blog post object if found.
 */
router.get("/:id", BlogController.findById);

/**
 * @description Update a blog post.
 * @param {string} id - The ID of the blog post to update.
 * @param {object} req.body - The update data for the blog post.
 * @returns {object} The updated blog post object.
 */
router.put("/:id", validateRequest(updateBlogSchema), BlogController.update);

/**
 * @description Delete a blog post by ID.
 * @param {string} id - The ID of the blog post to delete.
 * @returns {null} No content returned upon successful deletion.
 */
router.delete("/:id", BlogController.delete);

export default router;
