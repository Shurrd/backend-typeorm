import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),

  lastName: Joi.string().alphanum().required(),

  email: Joi.string().email().required(),

  gender: Joi.string().valid('male', 'female').required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  userType: Joi.string().valid('admin', 'customer'),

  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});
