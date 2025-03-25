import Joi from "joi";

export const createBlogSchema = Joi.object({
  body: Joi.object({
    blog_title: Joi.string().required().messages({
      "string.empty": "Blog title is required",
    }),
    blog_alt: Joi.string().required().messages({
      "string.empty": "Blog alt text is required",
    }),
    blog_category: Joi.string().optional(),
    blog_category_filter: Joi.array().items(Joi.string()).optional(),
    blog_date: Joi.date().required(),
    blog_date_search: Joi.date().required(),
    blog_description: Joi.string().optional(),
    blog_img: Joi.string().uri().optional(),
    read_more: Joi.string().optional(),
  }),
});

export const updateBlogSchema = Joi.object({
  body: createBlogSchema
    .extract("body")
    .fork(
      Object.keys(createBlogSchema.extract("body").describe().keys),
      (schema) => schema.optional()
    ),
});
