import socket from "..";
import { groupChannelSocketEvents } from "../SocketHandler";

export default function useGroupChannelSockets() {
  return (event: "update_channels_list", data: groupChannelSocketEvents) => {
    socket.emit(event, data);
  };
}
