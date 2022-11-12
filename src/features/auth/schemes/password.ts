
import Joi, { ObjectSchema } from 'joi';

const emailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': 'Field must be valid',
    'string.required': 'Password cannot be an empty field',
    'string.min': 'invalid password',
    'string.max': 'invalid password'
  })
});

const passwordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Field must be valid',
    'string.required': 'Password cannot be an empty field',
    'string.min': 'invalid password',
    'string.max': 'invalid password'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password cannot be an empty field'
  })
});

export { emailSchema, passwordSchema };

