import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { Connection } from "../Connection";
import { IdGenerator } from "../IdGenerator";

export class Neo4JUserRepository implements UserRepository {
  constructor(
    private readonly connection: Connection,
    private readonly id: IdGenerator,
  ) {}

  async list() {
    const users = await this.connection
      .query<unknown[]>('MATCH (p:Person) RETURN p');

    return users.map((user: any) => user.p.properties) as User[];
  }

  async findOne(id: number | string) {
    const query = `MATCH (p:Person { id: '${id}' }) RETURN p`;
    const users = await this.connection.query<any[]>(query);

    if (users.length <= 0) {
      return null;
    }

    return users[0].p.properties as User;
  }

  async save(user: Partial<User>) {
    const found = await this.findUser(user.id as string)
    const { id: _, ...rest } = user;

    if (found) {
      return this.updateData({ ...found, ...rest });
    }

    return this.createData(rest as User);
  }

  private async findUser(id: string): Promise<User | null> {
    const data = await this.connection
      .query<any[]>(`MATCH (p:Person { id: '${id}' }) RETURN p`);

    if (data.length === 0) {
      return null;
    }

    return data[0].p.properties as User;
  }

  private async createData(user: User): Promise<User> {
    const id = await this.id.generate();

    const query = `
      CREATE (p:Person { id: '${id}', name: '${user.name}', cpf: '${user.cpf}', phone: '${user.phone}', email: '${user.email}' })
      RETURN p
    `;

    return this.connection.query<User>(query);
  }

  private updateData(user: Partial<User>): Promise<User> {
    const query = `
      MERGE (p:Person { id: '${user.id}' })
      ON MATCH
        SET
          p.name = '${user.name}',
          p.cpf = '${user.cpf}',
          p.phone = '${user.phone}',
          p.email = '${user.email}'
      RETURN p
    `;

    return this.connection.query<User>(query);
  }

  async delete(id: string | number) {
    const query = `MATCH (n:Person {id: '${id}'}) DELETE n`

    await this.connection.query(query);
  }
}

