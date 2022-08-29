export interface Connection {
  connect(): Promise<void>;
  query<T>(query: string): Promise<T>;
  close(): Promise<void>;
}

