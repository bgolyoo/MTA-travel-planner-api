import { Module } from '@nestjs/common';
import { DB, DbProvider } from './db.provider';

@Module({
  providers: [DbProvider],
  exports: [DB],
})
export class DbModule {}
