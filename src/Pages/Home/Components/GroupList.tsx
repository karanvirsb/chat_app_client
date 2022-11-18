import React, { useEffect } from "react";
import useGetSession from "../../../Hooks/useGetSession";
import { useGetGroupsQuery } from "../../../Redux/slices/groupApiSlice";
import socket from "../../../Sockets";
import { isGroupArray } from "../../../test/validation/schemaValidation";

type props = {
    activeIndex: number;
    setTabToGroup: (id: string, index: number) => void;
};

export default function GroupList({ setTabToGroup, activeIndex }: props) {
    const { sessionInfo } = useGetSession();
    const {
        data: groups,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetGroupsQuery(sessionInfo?.userId ?? "1");

    useEffect(() => {
        // check if its done loading and is successful then add groups into array and add rooms;
        if (!isLoading && isSuccess && isGroupArray(groups)) {
            const groupIds = [];

            for (const group of groups) {
                groupIds.push(group.groupId);
            }

            socket.emit("join_rooms", {
                rooms: groupIds,
                userId: sessionInfo?.userId,
            });
        }
    }, [isLoading, isSuccess]);

    let content;

    if (isLoading) {
        content = <>Loading...</>;
    } else if (isSuccess) {
        if (groups === undefined) {
            content = <></>;
        } else if (isGroupArray(groups)) {
            content = groups.map((group, index) => {
                if (index === activeIndex) {
                    return (
                        <li key={group.groupId}>
                            <button
                                className='btn btn-circle bg-white text-black'
                                onClick={() =>
                                    setTabToGroup(group.groupId, index)
                                }
                            >
                                {
                                    group.groupName[0] // TODO split and get first index
                                }
                            </button>
                        </li>
                    );
                } else {
                    return (
                        <li key={group.groupId}>
                            <button
                                className='btn btn-circle'
                                onClick={() =>
                                    setTabToGroup(group.groupId, index)
                                }
                            >
                                {
                                    group.groupName[0] // TODO split and get first index
                                }
                            </button>
                        </li>
                    );
                }
            });
        }
    } else {
        content = <button className='btn btn-circle'>!</button>;
        console.error(groups);
    }
    return <>{content}</>;
}
