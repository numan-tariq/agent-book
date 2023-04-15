const Joi = require('joi')

const validateUserSignUpSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required().allow(null),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  resetPasswordToken: Joi.string().allow(null),
});

const validateUserSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateReqForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  validateUserSignUpSchema,
  validateUserSignInSchema,
  validateReqForgotPasswordSchema
}
