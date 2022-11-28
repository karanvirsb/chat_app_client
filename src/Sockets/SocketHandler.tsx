import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import socket from ".";
import { IGroup, IUser } from "../Hooks/groupHooks";

type props = {
    children: JSX.Element;
};

export type InvalidateEvent = {
    queryTags: string[];
    groupId: string;
};

export type UpdateEvent = {
    groupId: string;
    payload: Partial<IGroup>;
};

export type DeleteEvent = {
    groupId: string;
    payload: {};
};

export type JoinRoomEvent = {
    rooms: string[];
    userId: string;
};

export type UpdateGroupUsersEvent = {
    groupId: string;
    payload: { userInfo: IUser };
};

export type LeaveRoomEvent = {
    groupId: string;
    payload: { userId: string };
};

export type LeaveGroupEvent = {
    groupId: string;
    payload: { userId: string };
};

export type socketEvent =
    | InvalidateEvent
    | UpdateEvent
    | JoinRoomEvent
    | UpdateGroupUsersEvent
    | LeaveRoomEvent
    | LeaveGroupEvent;

export default function SocketHandler({ children }: props) {
    const queryClient = useQueryClient();
    useEffect(() => {
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
                const deleteGroup = (group: IGroup) =>
                    group.groupId !== data.groupId;
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

        return () => {
            socket.off("update_group_name"); // clean up
            socket.off("delete_group");
            socket.off("update_group_users");
        };
    }, [queryClient]);
    return children;
}
