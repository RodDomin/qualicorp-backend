export class Maybe<T> {
  private data: T;

  public static withoutData() {
    return new Maybe();
  }

  public static withData<T>(data: T): Maybe<T> {
    const instance = new Maybe<T>();

    instance.data = data;

    return instance;
  }

  retuned() {
    return !!this.data;
  }

  get() {
    return this.data;
  }
}

