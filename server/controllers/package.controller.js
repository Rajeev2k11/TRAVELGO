import { PackageService } from "../services/index.js";
import { ResponseUtil } from "../utils/index.js";

export class PackageController {
  static async create(req, res) {
    try {
      const tourPackage = await PackageService.create(req.body);
      return res
        .status(201)
        .json(
          ResponseUtil.success(tourPackage, "Tour package created successfully")
        );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findAll(req, res) {
    try {
      const result = await PackageService.findAll(req.query);
      return res.json(ResponseUtil.success(result));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findById(req, res) {
    try {
      const tourPackage = await PackageService.findById(req.params.id);
      if (!tourPackage) {
        return res
          .status(404)
          .json(ResponseUtil.error("Tour package not found", 404));
      }
      return res.json(ResponseUtil.success(tourPackage));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findBySlug(req, res) {
    try {
      const tourPackage = await PackageService.findBySlug(req.params.slug);
      if (!tourPackage) {
        return res
          .status(404)
          .json(ResponseUtil.error("Tour package not found", 404));
      }
      return res.json(ResponseUtil.success(tourPackage));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async update(req, res) {
    try {
      const tourPackage = await PackageService.update(req.params.id, req.body);
      if (!tourPackage) {
        return res
          .status(404)
          .json(ResponseUtil.error("Tour package not found", 404));
      }
      return res.json(
        ResponseUtil.success(tourPackage, "Tour package updated successfully")
      );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async delete(req, res) {
    try {
      const tourPackage = await PackageService.delete(req.params.id);
      if (!tourPackage) {
        return res
          .status(404)
          .json(ResponseUtil.error("Tour package not found", 404));
      }
      return res.json(
        ResponseUtil.success(null, "Tour package deleted successfully")
      );
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }
}
