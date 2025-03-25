import Joi from "joi";

export const createTourPackageSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "ID is required",
    }),
    name: Joi.string().min(10).max(200).required(),
    description: Joi.string().min(50).max(2000).required(),
    adult: Joi.number().min(0).default(0),
    child: Joi.number().min(0).default(0),
    relateKey: Joi.string().default("Europe"),
    keywords: Joi.string().default(""),
    destinationType: Joi.string()
      .valid("international", "domestic")
      .default("domestic"),
    destinationSearch: Joi.array().items(Joi.string()).required(),
    tourType: Joi.string().default("Group"),
    activityType: Joi.string().allow(null),
    landscapeType: Joi.string().default(""),
    tags: Joi.array().items(Joi.string()).default([]),
    webPackPrice: Joi.number().min(0).required(),
    packageRating: Joi.number().min(0).max(5).default(4.5),
    starRating: Joi.number().min(0).max(5).optional(),
    hotel: Joi.string().allow(null),
    startDate: Joi.date().allow(null),
    endDate: Joi.date().allow(null),
    duration: Joi.number().min(1).max(30).required(),
    monthLevelSelect: Joi.string().default(""),
    destination: Joi.string().required(),
    location: Joi.string().allow(null),
    dayWiseDuration: Joi.number().min(1).max(30).required(),
    hotelFacility: Joi.array().items(Joi.string()).default([]),
    luxuryPackage: Joi.string().default(""),
    coverImage: Joi.string().uri().required(),
    badges: Joi.array().items(Joi.string()).default([]),
    dataImages: Joi.array().items(Joi.string()).default([]),
    slug: Joi.string().required(),
    notes: Joi.string().allow(null),
    departureCity: Joi.string().default(""),
    onArrivalVisa: Joi.string().default("Granted"),
    groupDates: Joi.array().items(Joi.date()).default([]),
  }),
});

export const updateTourPackageSchema = Joi.object({
  body: createTourPackageSchema
    .extract("body")
    .fork(
      Object.keys(createTourPackageSchema.extract("body").describe().keys),
      (schema) => schema.optional()
    ),
});
