import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';

@Module({
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
  imports: [DbModule],
})
export class ItinerariesModule {}
