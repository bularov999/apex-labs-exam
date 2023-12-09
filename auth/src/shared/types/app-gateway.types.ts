import { UserEntity } from '../../modules/database/entities/user.entity';

export interface WsClient extends WebSocket {
  id: number;
  user: UserEntity;
  sendError: (error: unknown) => void;
  sendMessage: (message: unknown) => void;
}
