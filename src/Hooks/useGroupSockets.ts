import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import socket from "../Sockets";
import { IGroup } from "./groupHooks";

type InvalidateEvent = {
    queryTags: string[];
};

type socketEvent = InvalidateEvent;

export default function useGroupSockets() {
    const queryClient = useQueryClient();

    socket.on("updated_group_name", (data: InvalidateEvent) => {
        queryClient.invalidateQueries(data.queryTags);
    });

    useEffect(() => {
        return () => {
            socket.off("updated_group_name"); // clean up
        };
    }, [queryClient]);

    return (event: "updated_group_name", data: socketEvent) => {
        socket.emit(event, JSON.stringify(data));
    };
}
