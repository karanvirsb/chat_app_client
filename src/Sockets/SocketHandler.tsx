import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import socket from ".";
import { IGroupChannel } from "../Hooks/groupChannelHooks";
import { IGroup, IUser } from "../Hooks/groupHooks";
import { UpdateChannelsListEvent } from "./types/groupChannelTypes";
import {
  InvalidateEvent,
  UpdateEvent,
  JoinRoomEvent,
  UpdateGroupUsersEvent,
  LeaveRoomEvent,
  LeaveGroupEvent,
  DeleteEvent,
} from "./types/groupTypes";
import {
  ICreateGroupMessageEvent,
  IDeleteGroupMessageEvent,
  IUpdateGroupMessageEvent,
} from "./types/groupChatTypes";
import { PaginatedGroupMessages } from "../utilities/types/pagination";
import { IMessage } from "../Hooks/groupChatHooks";

type props = {
  children: JSX.Element;
};

export type groupSocketEvents =
  | InvalidateEvent
  | UpdateEvent
  | JoinRoomEvent
  | UpdateGroupUsersEvent
  | LeaveRoomEvent
  | LeaveGroupEvent;

export type groupChannelSocketEvents = UpdateChannelsListEvent;

export type groupChatSocketEvents =
  | {
      event: "create_group_message";
      data: ICreateGroupMessageEvent;
    }
  | { event: "update_group_message"; data: IUpdateGroupMessageEvent }
  | { event: "delete_group_message"; data: IDeleteGroupMessageEvent };

export default function SocketHandler({ children }: props) {
  const queryClient = useQueryClient();
  useEffect(() => {
    // Group Events
    socket.on("update_group_name", (data: UpdateEvent) => {
      queryClient.setQueriesData(["groups"], (oldData: unknown) => {
        const update = (entity: IGroup) =>
          entity.groupId === data.groupId
            ? { ...entity, ...data.payload }
            : entity;
        return Array.isArray(oldData) && oldData.map(update);
      });
    });

    socket.on("delete_group", (data: DeleteEvent) => {
      queryClient.setQueriesData(["groups"], (oldData: unknown) => {
        const deleteGroup = (group: IGroup) => group.groupId !== data.groupId;
        return Array.isArray(oldData) && oldData.filter(deleteGroup);
      });
    });

    socket.on("update_group_users", (data: UpdateGroupUsersEvent) => {
      queryClient.setQueriesData(
        [`group-users-${data.groupId}`],
        (oldData: unknown) => {
          const pushResult = (arr: IUser[]) => {
            return [...arr, data.payload.userInfo];
          };
          return Array.isArray(oldData) && pushResult(oldData);
        }
      );
    });

    socket.on("removed_user", (data: LeaveGroupEvent) => {
      queryClient.setQueriesData(
        [`group-users-${data.groupId}`],
        (oldData: unknown) => {
          const removeUser = (user: IUser) =>
            user.userId !== data.payload.userId;
          return Array.isArray(oldData) && oldData.filter(removeUser);
        }
      );
    });

    // Group Channel Events
    socket.on("update_channel_list", (data: UpdateChannelsListEvent) => {
      queryClient.setQueriesData(
        [`group-channels-${data.groupId}`],
        (oldData: unknown) => {
          // get the old data and push new result
          // need to assign it a new reference so it refreshes
          const pushNewChannel = (arr: IGroupChannel[]) => {
            return [...arr, data.payload.channelInfo];
          };
          // if the oldData is an array then add the push new channel
          return Array.isArray(oldData) && pushNewChannel(oldData);
        }
      );

      //Group chat events
      socket.on("new_group_chat_message", (data: ICreateGroupMessageEvent) => {
        const newMessage = data.payload.messageInfo;
        queryClient.setQueryData(
          [`group-messages-${newMessage.channelId}`],
          (oldData: unknown) => {
            const pushResult = (
              infiniteData: InfiniteData<PaginatedGroupMessages<IMessage>>
            ) => {
              if (data.payload !== undefined) {
                infiniteData.pages[0].data = [
                  ...infiniteData.pages[0].data,
                  newMessage,
                ];

                return structuredClone(infiniteData);
              }
            };

            return checkIfPagesExist(oldData) ? pushResult(oldData) : oldData;
          }
        );
      });

      socket.on(
        "update_group_chat_message",
        (data: IUpdateGroupMessageEvent) => {
          const updatedMessage = data.payload.messageInfo;
          queryClient.setQueryData(
            [`group-messages-${updatedMessage.channelId}`],
            (oldData: unknown) => {
              const updateResult = (
                infiniteData: InfiniteData<PaginatedGroupMessages<IMessage>>
              ) => {
                if (updatedMessage !== undefined) {
                  infiniteData.pages.map((page) => {
                    page.data.map((message) =>
                      message.messageId === updatedMessage.messageId
                        ? Object.assign(message, updatedMessage)
                        : message
                    );
                  });

                  return structuredClone(infiniteData);
                }
              };

              return checkIfPagesExist(oldData)
                ? updateResult(oldData)
                : oldData;
            }
          );
        }
      );

      socket.on(
        "delete_group_chat_message",
        (data: IDeleteGroupMessageEvent) => {
          const payload = data.payload;
          queryClient.setQueryData(
            [`group-messages-${payload.channelId}`],
            (oldData: unknown) => {
              const deleteResult = (
                infiniteData: InfiniteData<PaginatedGroupMessages<IMessage>>
              ) => {
                if (payload !== undefined) {
                  const filteredData: IMessage[][] = infiniteData.pages.map(
                    (page) =>
                      page.data.filter(
                        (message) => message.messageId !== payload.messageId
                      )
                  );
                  const newData: {
                    data: IMessage[];
                  }[] = filteredData.map((message) => {
                    return {
                      data: message,
                    };
                  });

                  return { ...infiniteData, pages: [...newData] };
                }
              };

              return checkIfPagesExist(oldData)
                ? deleteResult(oldData)
                : oldData;
            }
          );
        }
      );
    });

    return () => {
      socket.off("update_group_name"); // clean up
      socket.off("delete_group");
      socket.off("update_group_users");
      socket.off("removed_user");
      socket.off("update_channel_list");
    };
  }, [queryClient]);
  return children;
}

function checkIfPagesExist(
  arr: unknown | InfiniteData<PaginatedGroupMessages<IMessage>>
): arr is InfiniteData<PaginatedGroupMessages<IMessage>> {
  return (
    (arr as InfiniteData<PaginatedGroupMessages<IMessage>>).pages !==
      undefined &&
    (arr as InfiniteData<PaginatedGroupMessages<IMessage>>).pageParams !==
      undefined
  );
}
