import React from "react";
import { useGetGroupsQuery } from "../../../Redux/slices/groupApiSlice";

type props = {
    setTabToGroup: (id: string, index: number) => void;
};

export default function GroupList({ setTabToGroup }: props) {
    const {
        data: groups,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetGroupsQuery("");

    let content;

    if (isLoading) {
        content = <>Loading...</>;
    } else if (isSuccess) {
        content = groups.map((group, index) => {
            return (
                <li>
                    <button
                        className='btn btn-circle'
                        key={group.groupId}
                        onClick={() => setTabToGroup(group.groupId, index)}
                    >
                        {
                            group.groupName[0] // TODO split and get first index
                        }
                    </button>
                </li>
            );
        });
    } else if (isError) {
        content = <button className='btn btn-circle'>!</button>;
        console.error(error);
    }
    return <>{content}</>;
}
