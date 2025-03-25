import Joi from "joi";

export const createDestinationSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "ID is required",
    }),
    type: Joi.string().required().messages({
      "string.empty": "Type is required",
    }),
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    metatitle: Joi.string().optional(),
    idealTime: Joi.string().allow(null),
    idealDuration: Joi.string().allow(null),
    priceStarts: Joi.string().allow(null),
    bestAttraction: Joi.string().allow(null),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
    }),
    keywords: Joi.array().items(Joi.string()),
    shortPackageDesc: Joi.string().optional(),
    longPackageDesc: Joi.string().optional(),
    faqs: Joi.array().items(
      Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
      })
    ),
    status: Joi.number().default(1),
  }),
});

export const updateDestinationSchema = Joi.object({
  body: createDestinationSchema
    .extract("body")
    .fork(
      Object.keys(createDestinationSchema.extract("body").describe().keys),
      (schema) => schema.optional()
    ),
});
