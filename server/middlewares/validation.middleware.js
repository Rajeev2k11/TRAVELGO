import { ResponseUtil } from "../utils/index.js";

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );
      next();
    } catch (error) {
      return res
        .status(400)
        .json(
          ResponseUtil.error(
            error.details?.map((e) => e.message).join(", ") ||
              "Validation failed",
            400
          )
        );
    }
  };
};
