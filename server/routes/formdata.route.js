import express from "express";
import { FormdataService } from "../services";
const router = express.Router();

/**
 * @description Create the form in the database.
 * @param {object} req.body - Accepts the req.body.
 * @returns {object} - Returns the created formdata.
 */
router.post("/", FormdataService.create);

/**
 * @description Get all the formdata from the database.
 * @returns {object[]} - Returns the array of objects.
 */
router.get("/", FormdataService.getAll);

/**
 * @description Get formdata based on id.
 * @param {string} id - Accepts the formid (_id).
 * @returns {object} - Returns the formdata.
 */
router.get(":id", FormdataService.getByID);

/**
 * @description Delete the formdata from the database.
 * @param {string} id - Accepts the id of the formdata.
 * @returns {} - Returns nothing.
 */
router.delete(":id", FormdataService.delete);

/**
 * @description Update the formdata in the database.
 * @param {string} id - Accepts the id for finding the formdata.
 * @param {object} req.body - Accepts the body of the formdata to update.
 * @returns {object} - Returns the udpated Formdata.
 */
router.put(":id", FormdataService.update);

export default router;
