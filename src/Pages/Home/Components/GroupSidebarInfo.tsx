import React, { useEffect } from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import DropDown from "../../../Components/DropDown/DropDown";
import SidebarInfo from "../../../Components/SidebarInfo/SidebarInfo";
import Spinner from "../../../Components/Spinner/Spinner";
import { useAppDispatch } from "../../../Hooks/reduxHooks";
import useGetSession from "../../../Hooks/useGetSession";
import { groupApiSlice } from "../../../Redux/slices/groupApiSlice";
import { setModal } from "../../../Redux/slices/modalSlice";
import { isGroup } from "../../../test/validation/schemaValidation";
import useFilterGroups from "../Hooks/useFilterGroups";

type props = {
    groupId: string;
    setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
};

// TODO create channel components and set selected channel id
export default function GroupSidebarInfo({
    groupId,
    setSelectedChannel,
}: props) {
    const dispatch = useAppDispatch();

    const { sessionInfo } = useGetSession();

    const { data: groups, isLoading } =
        groupApiSlice.endpoints.getGroups.useQuery(sessionInfo?.userId, {
            skip: !sessionInfo,
        });
    const group = useFilterGroups({ groups, groupId });

    return (
        <SidebarInfo>
            <>
                <DropDown
                    btnChildren={getGroupName()}
                    btnClass='btn font-bold h-16 rounded-none w-full'
                    dropDownClass='flex flex-col items-center'
                    listClass='relative top-[125%] w-[90%]'
                    symbol={true}
                >
                    <>
                        <li>
                            <button
                                className='btn bg-btn-primary border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-primary-hover'
                                onClick={displayChangeGroupNameModal}
                            >
                                Change Group Name
                            </button>
                        </li>
                        <li>
                            <button
                                className='btn bg-btn-primary border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-primary-hover'
                                onClick={displayInviteUserModal}
                            >
                                Invite User
                            </button>
                        </li>
                        <li>
                            <button
                                className='btn bg-btn-mutations border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-mutations-hover'
                                onClick={displayDeleteGroupModal}
                            >
                                Delete Group
                            </button>
                        </li>
                        <li>
                            <button
                                className='btn bg-btn-mutations border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-mutations-hover'
                                onClick={displayLeaveGroupModal}
                            >
                                Leave Group
                            </button>
                        </li>
                    </>
                </DropDown>
                {/* <div className='bg-groupInfo-bg border-b border-chat-bg flex items-center font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
                    Group Name
                </div> */}
                <div className='bg-groupInfo-bg flex-grow text-white'>
                    <Collapse title='Text Channels'>
                        <ul>
                            <li>general</li>
                        </ul>
                    </Collapse>
                </div>
            </>
        </SidebarInfo>
    );

    function getGroupName() {
        if (isLoading) {
            return <Spinner></Spinner>;
        }
        return isGroup(group) ? group?.groupName : "";
    }

    // TODO added pass through values
    function displayChangeGroupNameModal() {
        if (isGroup(group))
            dispatch(
                setModal({
                    modalName: "changeGroupName",
                    open: true,
                    options: {
                        groupId: group.groupId,
                        previousName: group.groupName,
                    },
                })
            );
    }

    function displayInviteUserModal() {
        if (isGroup(group))
            dispatch(
                setModal({
                    modalName: "inviteUser",
                    open: true,
                    options: {
                        inviteCode: group.inviteCode,
                    },
                })
            );
    }

    function displayDeleteGroupModal() {
        if (isGroup(group))
            dispatch(
                setModal({
                    modalName: "deleteGroup",
                    open: true,
                    options: { groupId: group.groupId },
                })
            );
    }

    function displayLeaveGroupModal() {
        dispatch(
            setModal({
                modalName: "leaveGroup",
                open: true,
                options: { groupId },
            })
        );
    }
}
