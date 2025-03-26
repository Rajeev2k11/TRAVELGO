import { Router } from "express";
import { PackageController } from "../controllers/index.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createTourPackageSchema,
  updateTourPackageSchema,
} from "../validation/package.validation.js";

const router = Router();

/**
 * @description Create single package in database
 * @param {object} - the req.body validation
 * @return {object} A created tour package.
 */
router.post(
  "/",
  validateRequest(createTourPackageSchema),
  PackageController.create
);

/**
 * @description Get all the packages from the database
 * @returns {object[]} List of pacakages in an array
 */
router.get("/", PackageController.findAll);

/**
 * @description Get single package based on ID.
 * @param {string} id - Accepts the id of the package
 * @returns {object} Package retrieved by ID.
 */
router.get("/:id", PackageController.findById);

/**
 * @description Find the package based on slug.
 * @param {string} slug - Accepts the slug of the packages.
 * @returns {object} Package retrieved by slug.
 */
router.get("/slug/:slug", PackageController.findBySlug);

/**
 * @description Update the package in the database.
 * @param {object} req.body - Accepts the update package body
 * @returns {object} Returns the udpated package
 */
router.put(
  "/:id",
  validateRequest(updateTourPackageSchema),
  PackageController.update
);

/**
 * @description Delete the package based on id
 * @param {id} packageId - Accepts the _id of the package.
 * @returns {null};- Returns nothing.
 */
router.delete("/:id", PackageController.delete);

export default router;
