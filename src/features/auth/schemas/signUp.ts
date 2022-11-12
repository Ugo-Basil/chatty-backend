import Joi, { ObjectSchema } from 'joi';

const signUpSchema: ObjectSchema = Joi.object().keys(
  {
    username: Joi.string().required().min(4).max(8).messages({
      'string.base': 'Username should be a type of "text"',
      'string.empty': 'Username cannot be an empty field',
      'string.min': 'invalid username',
      'string.max': 'invalid username',
    }),
    password: Joi.string().required().min(4).max(8).messages({
      'string.base': 'Password should be a type of "text"',
      'string.empty': 'Password cannot be an empty field',
      'string.min': 'invalid password',
      'string.max': 'invalid password',
    }),

    email: Joi.string().required().email().messages({
      'string.base': 'Email should be a type of "text"',
      'string.empty': 'Email cannot be an empty field',
      'string.email': 'invalid email',
    }),

    avatarColor: Joi.string().required().messages({
      'any.required': 'Avatar color is required'
     }),

    avatarImage: Joi.string().required().messages({
      'any.required': 'Avatar image is required'
    })

  });

  export { signUpSchema };


