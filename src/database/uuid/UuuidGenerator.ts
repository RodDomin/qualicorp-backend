import { IdGenerator } from "../IdGenerator";
import { v4 } from "uuid";

export class UuuidGenerator implements IdGenerator {
  public async generate(): Promise<string> {
    return v4();
  }
}
