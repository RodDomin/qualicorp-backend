import { User } from "../entities/User";

export interface UserRepository {
  list(): Promise<User[]>;
  save(user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}

