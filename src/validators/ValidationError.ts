export class ValidationError extends Error {
  constructor(
    public readonly errors: Record<string, any>
  ) {
    super();
  }
}

