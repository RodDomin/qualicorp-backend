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
  }

  async close() {
    await this.driver.close();
  }

  async query<T>(query: string) {
    this.session = this.driver.session({
      database: databaseConfig.DATABASE,
    });

    const result = await this.session.run(query);

    await this.session.close();

    return result
      .records
      .map((record) => record.toObject()) as T;
  }
}

