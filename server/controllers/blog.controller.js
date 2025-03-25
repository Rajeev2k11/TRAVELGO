import { BlogService } from "../services/index.js";
import { ResponseUtil } from "../utils/index.js";

export class BlogController {
  static async create(req, res) {
    try {
      const blog = await BlogService.create(req.body);
      return res
        .status(201)
        .json(ResponseUtil.success(blog, "Blog created successfully"));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findAll(req, res) {
    try {
      const result = await BlogService.findAll(req.query);
      return res.json(ResponseUtil.success(result));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async findById(req, res) {
    try {
      const blog = await BlogService.findById(req.params.id);
      if (!blog) {
        return res.status(404).json(ResponseUtil.error("Blog not found", 404));
      }
      return res.json(ResponseUtil.success(blog));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async update(req, res) {
    try {
      const blog = await BlogService.update(req.params.id, req.body);
      if (!blog) {
        return res.status(404).json(ResponseUtil.error("Blog not found", 404));
      }
      return res.json(ResponseUtil.success(blog, "Blog updated successfully"));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }

  static async delete(req, res) {
    try {
      const blog = await BlogService.delete(req.params.id);
      if (!blog) {
        return res.status(404).json(ResponseUtil.error("Blog not found", 404));
      }
      return res.json(ResponseUtil.success(null, "Blog deleted successfully"));
    } catch (error) {
      return res.status(500).json(ResponseUtil.error(error.message));
    }
  }
}
