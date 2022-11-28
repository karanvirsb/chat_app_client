import socket from "..";
import { socketEvent } from "../SocketHandler";

export default function useGroupSockets() {
    return (
        event:
            | "updated_group_name"
            | "delete_the_group"
            | "join_rooms"
            | "update_the_group_users",
        data: socketEvent
    ) => {
        socket.emit(event, data);
    };
}
