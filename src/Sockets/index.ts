import { io } from "socket.io-client";
const socket = io("http://localhost:8000", {
    reconnectionAttempts: 2,
    closeOnBeforeunload: false,
    autoConnect: false,
});

export default socket;
