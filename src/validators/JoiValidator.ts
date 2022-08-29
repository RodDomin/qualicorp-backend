import { Validator } from "./Validator";
import Joi from 'joi';
import { Maybe } from "../shared/Maybe";
import { ValidationError } from "./ValidationError";

export class JoiValidator implements Validator {
  constructor(
    private readonly schema: Joi.ObjectSchema,
  ) {}

  public validate(data: Record<string, any>): Maybe<ValidationError> {
    const returned = this.schema.validate(data);

    if (returned.error) {
      return Maybe.withData(new ValidationError());
    }

    return Maybe.withoutData() as Maybe<ValidationError>;
  }

}
