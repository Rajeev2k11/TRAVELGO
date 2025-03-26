import { DestinationService } from "../services/index.js";
import { ResponseUtil } from "../utils/index.js";

export class DestinationController {
  static async create(req, res) {
    try {
      const destination = await DestinationService.create(req.body);
      return res
        .status(201)
        .json(
          ResponseUtil.success(destination, "Destination created successfully")
        );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findAll(req, res) {
    try {
      const result = await DestinationService.findAll(req.query);
      return res.json(ResponseUtil.success(result));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findTopDestinations(req, res) {
    try {
      const destinations = await DestinationService.findTopDestinations();
      return res.json(ResponseUtil.success(destinations));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async searchByName(req, res) {
    try {
      const { name } = req.query;
      if (!name) {
        return res
          .status(400)
          .json(ResponseUtil.error("Please provide a search query"));
      }
      const destinations = await DestinationService.searchByName(name);
      return res.json(ResponseUtil.success(destinations));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findById(req, res) {
    try {
      const destination = await DestinationService.findById(req.params.id);
      if (!destination) {
        return res
          .status(404)
          .json(ResponseUtil.error("Destination not found", 404));
      }
      return res.json(ResponseUtil.success(destination));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async update(req, res) {
    try {
      const destination = await DestinationService.update(
        req.params.id,
        req.body
      );
      if (!destination) {
        return res
          .status(404)
          .json(ResponseUtil.error("Destination not found", 404));
      }
      return res.json(
        ResponseUtil.success(destination, "Destination updated successfully")
      );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async delete(req, res) {
    try {
      const destination = await DestinationService.delete(req.params.id);
      if (!destination) {
        return res
          .status(404)
          .json(ResponseUtil.error("Destination not found", 404));
      }
      return res.json(
        ResponseUtil.success(null, "Destination deleted successfully")
      );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }
}
