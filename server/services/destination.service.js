import { Destination } from "../models/index.js";

export class DestinationService {
  static async create(destinationData) {
    return await Destination.create(destinationData);
  }

  static async findAll(query = {}) {
    const { page = 1, limit = 10, type, search } = query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [destinations, total] = await Promise.all([
      Destination.find(filter)
        .sort({ insertDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Destination.countDocuments(filter),
    ]);

    return {
      destinations,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  static async findById(id) {
    return await Destination.findOne({ id }).lean();
  }

  static async update(id, updateData) {
    return await Destination.findOneAndUpdate(
      { id },
      { ...updateData, updateDate: new Date() },
      { new: true }
    ).lean();
  }

  static async delete(id) {
    return await Destination.findOneAndDelete({ id });
  }
}
