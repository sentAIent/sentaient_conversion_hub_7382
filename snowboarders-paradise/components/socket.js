import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

// We disable endless reconnection spam if the backend isn't running
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 3,
  reconnectionDelay: 2000
});
