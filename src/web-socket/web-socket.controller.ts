import { Controller } from '@nestjs/common';
import { WebSocketService } from './web-socket.service';

@Controller('web-socket')
export class WebSocketController {
  constructor(private readonly webSocketService: WebSocketService) {}
}
