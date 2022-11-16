import { io } from "socket.io-client";
const socket = io("http://localhost:8000", {
    reconnectionAttempts: 2,
    closeOnBeforeunload: true,
    autoConnect: true,
});

export default socket;
