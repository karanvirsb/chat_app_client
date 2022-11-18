import React from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import DropDown from "../../../Components/DropDown/DropDown";
import SidebarInfo from "../../../Components/SidebarInfo/SidebarInfo";
import Spinner from "../../../Components/Spinner/Spinner";
import { useAppDispatch } from "../../../Hooks/reduxHooks";
import { IGroup } from "../../../Redux/slices/groupApiSlice";
import { setModal } from "../../../Redux/slices/modalSlice";

type props = {
    groupData: IGroup;
    setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
};

// TODO create channel components and set selected channel id
export default function GroupSidebarInfo({
    groupData,
    setSelectedChannel,
}: props) {
    const dispatch = useAppDispatch();

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
        return groupData.groupName;
    }

    // TODO added pass through values
    function displayChangeGroupNameModal() {
        dispatch(
            setModal({
                modalName: "changeGroupName",
                open: true,
                options: {
                    groupId: groupData.groupId,
                    previousName: groupData.groupName,
                },
            })
        );
    }

    function displayInviteUserModal() {
        dispatch(
            setModal({ modalName: "inviteUser", open: true, options: {} })
        );
    }

    function displayDeleteGroupModal() {
        dispatch(
            setModal({ modalName: "deleteGroup", open: true, options: {} })
        );
    }

    function displayLeaveGroupModal() {
        dispatch(
            setModal({ modalName: "leaveGroup", open: true, options: {} })
        );
    }
}
