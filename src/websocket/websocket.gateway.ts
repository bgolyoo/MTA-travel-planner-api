import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  allowUpgrades: true,
  path: '/ws',
  transports: ['polling', 'websocket'],
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;

  selectedRoom: string;

  private path: string | undefined = undefined;

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    this.selectedRoom = room;
    this.server.to(client.id).emit('CLIENT_CONNECTED_EVENT');
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  afterInit(server: Server) {
    this.path = server.path();
    console.debug(`Websocket server(${this.path}) initialized`);
  }

  async handleDisconnect(client: Socket) {
    console.debug(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    client.emit('connected', 'Successfully connected to the server.');
  }
}
