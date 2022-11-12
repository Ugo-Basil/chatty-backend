import Joi, { ObjectSchema } from 'joi';


const signInSchema: ObjectSchema = Joi.object().keys(
  {
    username: Joi.string().required().min(4).max(8).messages(

      {
        'string.base': 'Username should be a type of "text"',
        'string.empty': 'Username cannot be an empty field',
        'string.min': 'invalid username',
        'string.max': 'invalid username',
      }),
    password: Joi.string().required().min(4).max(8).messages(
      {
        'string.base': 'Password should be a type of "text"',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'invalid password',
        'string.max': 'invalid password'
      })
  });

export { signInSchema };