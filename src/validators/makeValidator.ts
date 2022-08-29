import Joi from 'joi';
import { JoiValidator } from './JoiValidator';
import { RequestValidator } from './RequestValidator';

export function makeValidator(schema: Joi.ObjectSchema, field: Function) {
  const requestValidator = new RequestValidator(
    new JoiValidator(schema),
    field,
  );

  return requestValidator.execute.bind(requestValidator);
}
