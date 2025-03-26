import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blog_title: {
      type: String,
      required: true,
    },
    blog_alt: {
      type: String,
      required: true,
    },
    blog_category: {
      type: String,
    },
    blog_category_filter: {
      type: [String],
    },
    blog_date: {
      type: Date,
      required: true,
    },
    blog_date_search: {
      type: Date,
      required: true,
    },
    blog_description: {
      type: String,
    },
    blog_img: {
      type: String,
    },
    read_more: {
      type: String,
      // Specify the route where user can read more
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
