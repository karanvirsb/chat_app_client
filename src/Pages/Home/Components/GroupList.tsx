import React, { useEffect } from "react";
import useGetSession from "../../../Hooks/useGetSession";
import { useGetGroupsQuery } from "../../../Redux/slices/groupApiSlice";
import socket from "../../../Sockets";

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
        if (!isLoading && isSuccess) {
            if (groups.success && groups.data) {
                const groupIds = [];

                for (const group of groups.data) {
                    groupIds.push(group.groupId);
                }

                socket.emit("join_rooms", groupIds);
            }
        }
    }, [isLoading, isSuccess]);

    let content;

    if (isLoading) {
        content = <>Loading...</>;
    } else if (isSuccess) {
        if (groups.data === undefined) {
            content = <></>;
        } else {
            content = groups.data.map((group, index) => {
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
    } else if (isError) {
        content = <button className='btn btn-circle'>!</button>;
        console.error(groups?.error);
    }
    return <>{content}</>;
}
