import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { Connection } from "../Connection";

export class Neo4JUserRepository implements UserRepository {
  constructor(
    private readonly connection: Connection,
  ) {}

  async list() {
    return this.connection
      .query<User[]>('MATCH (p:Person) RETURN p');
  }

  async save(_user: Partial<User>) {
    return _user as User;
  }

  async delete(_id: number) {
    
  }
}

