import { useQueryClient } from "@tanstack/react-query";
import React, { ReactElement, useEffect } from "react";
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

export type socketEvent = InvalidateEvent | UpdateEvent;

export default function SocketHandler({ children }: props) {
    const queryClient = useQueryClient();
    useEffect(() => {
        socket.on("update_group_name", (data: UpdateEvent) => {
            console.log("water");
            queryClient.setQueriesData(["groups"], (oldData: unknown) => {
                const update = (entity: IGroup) =>
                    entity.groupId === data.groupId
                        ? { ...entity, ...data.payload }
                        : entity;
                return Array.isArray(oldData) && oldData.map(update);
            });
        });
        return () => {
            socket.off("update_group_name"); // clean up
        };
    }, [queryClient]);
    return children;
}
