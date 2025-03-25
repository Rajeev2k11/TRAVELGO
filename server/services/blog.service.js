import { Blog } from "../models/index.js";
import mongoose from "mongoose";

export class BlogService {
  static async create(blogData) {
    return await Blog.create(blogData);
  }

  static async findAll(query = {}) {
    const { page = 1, limit = 10, category, search } = query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (category) filter.blog_category = category;
    if (search) {
      filter.$or = [
        { blog_title: { $regex: search, $options: "i" } },
        { blog_description: { $regex: search, $options: "i" } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ blog_date: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);

    return {
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  static async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Blog.findById(id).lean();
  }

  static async update(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Blog.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  static async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Blog.findByIdAndDelete(id);
  }
}
