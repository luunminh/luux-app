import configs from '@config';
import { TokenService } from '@core/common';
import { IGetDesign } from '@modules/design/queries';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, IDesignPayload, ServerToClientEvents } from './socket.interface';

enum DesignEventEnum {
  JOIN = 'join',
  LEAVE = 'leave',
  EDITING = 'editing',
}

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {
    this.socket = io(configs.WS_URL, {
      autoConnect: false,
    });
  }

  connect() {
    const token = TokenService.getACToken();
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  subscribeToEditing(designHandler: ServerToClientEvents['editing']) {
    if (this.socket.connected) {
      this.socket.on(DesignEventEnum.EDITING, designHandler);
    }
  }

  subscribeToLeave(leaveHandler: ServerToClientEvents['leave']) {
    if (this.socket.connected) {
      this.socket.on(DesignEventEnum.LEAVE, leaveHandler);
    }
  }

  subscribeToJoin(joinHandler: ServerToClientEvents['join']) {
    this.socket.on(DesignEventEnum.JOIN, joinHandler);
  }

  joinDesign(payload: IDesignPayload) {
    if (this.socket.connected) {
      this.socket.emit(DesignEventEnum.JOIN, payload);
    }
  }

  editDesign(data: IGetDesign) {
    if (this.socket.connected) {
      this.socket.emit(DesignEventEnum.EDITING, data);
    }
  }

  leaveDesign(payload: IDesignPayload) {
    if (this.socket.connected) {
      this.socket.emit(DesignEventEnum.LEAVE, payload);
    }
  }
}

export const socketService = new SocketService();
