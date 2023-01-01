import { useQueryClient } from "@tanstack/react-query";
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
