import { FactoryProvider } from '@nestjs/common';
import * as Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export const DB = Symbol('DB_SERVICE');
export type DbType = BetterSQLite3Database;

export const DbProvider: FactoryProvider = {
  provide: DB,
  useFactory: () => {
    const sqlite = new Database('sqlite.db');
    return drizzle(sqlite);
  },
};
