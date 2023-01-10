import React from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { IMessage } from "../../Hooks/groupChatHooks";
import { IUser } from "../../Hooks/groupHooks";
import { useQueryClient } from "@tanstack/react-query";

type props = {
  messages: IMessage[] | undefined;
  groupId: string;
};

export default function Messages({ messages, groupId }: props) {
  const queryClient = useQueryClient();
  const groupUsers = queryClient.getQueriesData([
    `group-users-${groupId}`,
  ])[0][1] as unknown[];

  return (
    <>
      {messages?.map((message) => {
        const foundUser = isGroupUsers(groupUsers)
          ? groupUsers.find((user) => user.userId === message.userId)
          : undefined;

        return (
          <div
            key={message.messageId}
            className="flex flex-col gap-2 py-2 px-4 rounded-md hover:bg-[#2A303C]"
          >
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold">
                {foundUser?.username}
              </span>
              <span className="text-sm text-[#ABABAB]">
                {dayjs(message.dateCreated).format("L LTS")}
              </span>
            </div>
            <p className="text-[#D9D9D9]">{message.text}</p>
          </div>
        );
      })}
    </>
  );

  function isGroupUsers(arr: IUser[] | unknown[]): arr is IUser[] {
    return (
      (arr as IUser[]).map !== undefined &&
      (arr as IUser[])[0].userId !== undefined
    );
  }
}
