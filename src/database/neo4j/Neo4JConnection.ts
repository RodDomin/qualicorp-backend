import neo4j, { Driver, Session } from 'neo4j-driver';
import { Connection } from '../Connection';
import { databaseConfig } from '../../configs/database';

export class Neo4JConnection implements Connection {
  private driver: Driver;
  private session: Session;

  async connect() {
    this.driver = neo4j.driver(
      databaseConfig.URL,
      neo4j.auth.basic(databaseConfig.USER, databaseConfig.PASS)
    );

    this.session = this.driver.session({
      database: databaseConfig.DATABASE,
    });
  }

  async close() {
    await this.session.close();
    await this.driver.close();
  }

  async query<T>(query: string) {
    const result = await this.session.run(query);

    return result
      .records
      .map((record) => record.toObject()) as T;
  }
}

