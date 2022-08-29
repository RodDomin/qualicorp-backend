import Joi from 'joi';

export const CreateUserSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

