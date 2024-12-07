import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  readonly clients: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, `User-${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { sender: string; message: string; client_id: string; }): void {
    const recipientSocketId = this.clients.get(client.id);
    console.log(recipientSocketId)
    console.log(`Received message from ${client.id}: ${payload.message}`);
    this.server.emit('receiveMessage', {
        sender: payload.sender,
        message: payload.message,
        isSender: payload.client_id
    });
  }
}
