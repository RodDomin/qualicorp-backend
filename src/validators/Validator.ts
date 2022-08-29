import { Maybe } from "../shared/Maybe";
import { ValidationError } from "./ValidationError";

export interface Validator {
  validate(data: Record<string, any>): Maybe<ValidationError>;
}
