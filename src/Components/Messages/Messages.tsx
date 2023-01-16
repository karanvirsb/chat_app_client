import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IMessage } from "../../Hooks/groupChatHooks";
import { IUser } from "../../Hooks/groupHooks";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useQueryClient,
} from "@tanstack/react-query";
import Message from "./Message";
import { PaginatedGroupMessages } from "../../utilities/types/pagination";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
dayjs.extend(localizedFormat);

interface props {
  messages: IMessage[] | undefined;
  groupId: string;
  lastPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      PaginatedGroupMessages<IMessage> | undefined,
      unknown
    >
  >;
}

export default function Messages({
  messages,
  groupId,
  lastPage,
  fetchNextPage,
}: props): JSX.Element {
  const firstElementRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(firstElementRef, {});
  const isVisible = !!((entry?.isIntersecting) ?? false);

  const queryClient = useQueryClient();
  const groupUsers = queryClient.getQueriesData([
    `group-users-${groupId}`,
  ])[0][1] as unknown[];

  useEffect(() => {
    if (isVisible && (fetchNextPage != null)){
        void fetchNextPage()
    } 
  }, [fetchNextPage, isVisible]);

  return (
    <>
      {messages?.map((message, index) => {
        const foundUser = isGroupUsers(groupUsers)
          ? groupUsers.find((user) => user.userId === message.userId)
          : undefined;
        if (lastPage && index === 0) {
          return (
            <Message
              ref={firstElementRef}
              message={message}
              username={foundUser?.username}
            ></Message>
          );
        } else {
          return (
            <Message message={message} username={foundUser?.username}></Message>
          );
        }
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
