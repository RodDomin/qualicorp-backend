import { NextFunction, Request, Response } from "express";
import { Validator } from "./Validator";

export class RequestValidator {
  constructor(
    private readonly validator: Validator,
    private readonly fieldGetter: Function,
  ) {}

  public execute(request: Request, response: Response, next: NextFunction) {
    const field = this.fieldGetter(request);

    const maybeError = this.validator.validate(field);

    if (maybeError.retuned()) {
      return response.status(400).json(maybeError.get());
    }

    return next();
  }
}
