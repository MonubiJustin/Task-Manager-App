const Joi = require("joi");

// Login Joi validation
exports.log_validator = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email().trim().max(50).messages({
      "string.max": "Email cannot exceed 50 characters",
      "string.email": "Invalid email",
    }),
    password: Joi.string().required().trim().min(8).max(50).messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 50 characters",
    }),
  });

  return schema.validate(body);
};

// Registration Joi validation
exports.reg_validator = (body) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .lowercase()
      .trim()
      .min(3)
      .max(50)
      .messages({
        "string.min": "name must be at least 3 characters",
      }),
    email: Joi.string().required().trim().email().max(50).messages({
      "string.email": "Invalid email",
      "string.max": "Email cannot exceed 50 characters",
    }),
    password: Joi.string().required().trim().min(8).max(50).messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 50 characters",
    }),
  });

  return schema.validate(body);
};
