import socket from "..";
import { socketEvent } from "../SocketHandler";

export default function useGroupChannelSockets() {
  return (event: "update_channel_list", data: socketEvent) => {
    socket.emit(event, data);
  };
}
