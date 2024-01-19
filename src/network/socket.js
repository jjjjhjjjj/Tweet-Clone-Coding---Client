import { io } from "socket.io-client";

export default class SocketIOService {
  constructor(baseURL) {
    this.socket = io(baseURL);
  }

  connet() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  on(event, callback) {
    this.connet();

    this.socket.on(event, callback);

    return () => this.socket.off(event);
  }
}
