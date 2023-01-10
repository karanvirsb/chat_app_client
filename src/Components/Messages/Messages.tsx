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
  console.log(groupUsers);
  return (
    <>
      {messages?.map((message) => {
        const foundUser = isGroupUsers(groupUsers)
          ? groupUsers.find((user) => user.userId === message.userId)
          : undefined;
        console.log(foundUser);
        return (
          <div key={message.messageId}>
            <div>
              <span>{foundUser?.username}</span>
              <span>{dayjs(message.dateCreated).format("ll LTS")}</span>
              <p>{message.text}</p>
            </div>
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
