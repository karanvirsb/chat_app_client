import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import socket from ".";
import { IGroup } from "../Hooks/groupHooks";

type props = {
    children: JSX.Element;
};

export type InvalidateEvent = {
    queryTags: string[];
    id: string;
};

export type UpdateEvent = {
    groupId: string;
    payload: Partial<IGroup>;
};

export type DeleteEvent = {
    groupId: string;
    payload: {};
};

export type socketEvent = InvalidateEvent | UpdateEvent;

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
            console.log(data);
            queryClient.setQueriesData(["groups"], (oldData: unknown) => {
                const deleteGroup = (group: IGroup) =>
                    group.groupId !== data.groupId;
                return Array.isArray(oldData) && oldData.filter(deleteGroup);
            });
        });

        return () => {
            socket.off("update_group_name"); // clean up
            socket.off("delete_group");
        };
    }, [queryClient]);
    return children;
}
