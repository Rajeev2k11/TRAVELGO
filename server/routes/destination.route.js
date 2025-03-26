import { Router } from "express";
import { DestinationController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "../validation/destination.validation.js";

const router = Router();

/**
 * @description Create a new destination in the database.
 * @param {object} req.body - The request body containing destination details.
 * @returns {object} The created destination object.
 */
router.post(
  "/",
  validateRequest(createDestinationSchema),
  DestinationController.create
);

/**
 * @description Retrieve all destinations from the database.
 * @returns {object[]} An array of all destinations.
 */
router.get("/", DestinationController.findAll);

/**
 * @description Retrieve the top destinations based on popularity.
 * @returns {object[]} An array of top destinations.
 */
router.get("/top-destination", DestinationController.findTopDestinations);

/**
 * @description Search for destinations by name.
 * @param {string} req.query.name - The search term for destination names.
 * @returns {object[]} An array of matching destinations.
 */
router.get("/search", DestinationController.searchByName);

/**
 * @description Retrieve a destination by its ID.
 * @param {string} id - The ID of the destination.
 * @returns {object} The destination object if found.
 */
router.get("/:id", DestinationController.findById);

/**
 * @description Update a destination's details.
 * @param {string} id - The ID of the destination to update.
 * @param {object} req.body - The update data for the destination.
 * @returns {object} The updated destination object.
 */
router.put(
  "/:id",
  validateRequest(updateDestinationSchema),
  DestinationController.update
);

/**
 * @description Delete a destination by ID.
 * @param {string} id - The ID of the destination to delete.
 * @returns {null} No content returned upon successful deletion.
 */
router.delete("/:id", DestinationController.delete);

export default router;
