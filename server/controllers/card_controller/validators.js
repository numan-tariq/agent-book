const Joi = require("joi");

const validateAddCardSchema = Joi.object({
  title: Joi.string().required("Title is requried."),
  description: Joi.string().allow(""),
  status: Joi.string()
    .required()
    .valid("backlog", "to_do", "in_process", "in_review", "completed"),
  project_id: Joi.string().uuid().required("Project ID is required."),
});

const validateFilterSchema = Joi.object({
  status: Joi.string().valid(
    "backlog",
    "to_do",
    "in_process",
    "in_review",
    "completed"
  ).allow(""),
  project_id: Joi.string().uuid().allow(""),
});

module.exports = {
  validateAddCardSchema,
  validateFilterSchema
};
