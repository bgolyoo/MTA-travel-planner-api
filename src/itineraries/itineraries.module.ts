import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';

@Module({
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
  imports: [DbModule, WebsocketModule],
})
export class ItinerariesModule {}
