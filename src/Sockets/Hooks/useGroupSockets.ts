import socket from "..";
import { socketEvent } from "../SocketHandler";

export default function useGroupSockets() {
    return (event: "updated_group_name", data: socketEvent) => {
        socket.emit(event, data);
    };
}
