import { Package } from "../models/index.js";

export class PackageService {
  static async create(packageData) {
    return await Package.create(packageData);
  }

  static async findAll(query = {}) {
    const {
      page = 1,
      limit = 10,
      destinationType,
      tourType,
      minPrice,
      maxPrice,
      duration,
      search,
    } = query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (destinationType) filter.destinationType = destinationType;
    if (tourType) filter.tourType = tourType;
    if (minPrice || maxPrice) {
      filter.webPackPrice = {};
      if (minPrice) filter.webPackPrice.$gte = Number(minPrice);
      if (maxPrice) filter.webPackPrice.$lte = Number(maxPrice);
    }
    if (duration) filter.duration = Number(duration);
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
      ];
    }

    const [packages, total] = await Promise.all([
      Package.find(filter)
        .sort({ dateAdded: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Package.countDocuments(filter),
    ]);

    return {
      packages,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  static async findById(id) {
    return await Package.findOne({ id }).lean();
  }

  static async findBySlug(slug) {
    return await Package.findOne({ slug }).lean();
  }

  static async update(id, updateData) {
    return await Package.findOneAndUpdate({ id }, updateData, {
      new: true,
    }).lean();
  }

  static async delete(id) {
    return await Package.findOneAndDelete({ id });
  }
}
