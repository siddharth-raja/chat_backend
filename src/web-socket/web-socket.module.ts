import { Module } from '@nestjs/common';
import { WebSocketService } from './web-socket.service';
import { WebSocketController } from './web-socket.controller';

@Module({
  controllers: [WebSocketController],
  providers: [WebSocketService],
})
export class WebSocketModule {}
