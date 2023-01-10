import React from "react";
import { IMessage } from "../../Hooks/groupChatHooks";
import dayjs from "dayjs";

type props = {
  message: IMessage;
  username: string | undefined;
};

export default function Message({ message, username }: props) {
  return (
    <div
      key={message.messageId}
      className="flex flex-col gap-2 py-2 px-4 rounded-md hover:bg-[#2A303C]"
    >
      <div className="flex items-center gap-4">
        <span className="text-white font-semibold">
          {username ?? "Could not find username."}
        </span>
        <span className="text-sm text-[#ABABAB]">
          {dayjs(message.dateCreated).format("L LTS")}
        </span>
      </div>
      <p className="text-[#D9D9D9]">{message.text}</p>
    </div>
  );
}
