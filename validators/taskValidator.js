const Joi = require("joi");

module.exports = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
  });

  return schema.validate(body);
};
