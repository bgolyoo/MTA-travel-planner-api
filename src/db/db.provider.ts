import { FactoryProvider } from '@nestjs/common';
import * as Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const DB = Symbol('DB_SERVICE');
export type DbType = BetterSQLite3Database;

export const DbProvider: FactoryProvider = {
  provide: DB,
  useFactory: async () => {
    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);

    await migrate(db, { migrationsFolder: 'migrations' });

    return db;
  },
};
