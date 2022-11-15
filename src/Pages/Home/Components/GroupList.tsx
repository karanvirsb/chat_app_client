import React from "react";
import useGetSession from "../../../Hooks/useGetSession";
import { useGetGroupsQuery } from "../../../Redux/slices/groupApiSlice";

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
                        <li>
                            <button
                                className='btn btn-circle bg-white text-black'
                                key={group.groupId}
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
                        <li>
                            <button
                                className='btn btn-circle'
                                key={group.groupId}
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
