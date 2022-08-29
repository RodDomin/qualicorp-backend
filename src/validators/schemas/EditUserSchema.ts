import Joi from 'joi';

export const EditUserSchema = Joi.object({
  name: Joi.string(),
  cpf: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
});

