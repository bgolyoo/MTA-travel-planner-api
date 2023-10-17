import { Module } from '@nestjs/common';

import { WebsocketGateway } from './websocket.gateway';

@Module({
  exports: [WebsocketGateway],
  providers: [WebsocketGateway],
  imports: [],
})
export class WebsocketModule {}
