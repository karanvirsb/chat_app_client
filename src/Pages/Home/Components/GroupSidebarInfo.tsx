import React from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import DropDown from "../../../Components/DropDown/DropDown";
import { useAppDispatch } from "../../../Hooks/reduxHooks";
import { setModal } from "../../../Redux/slices/modalSlice";

export default function GroupSidebarInfo() {
    const dispatch = useAppDispatch();
    return (
        <div className='flex flex-col sm:-translate-x-[100%] sm:fixed'>
            <DropDown
                btnChildren='Group Name'
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
        </div>
    );

    // TODO added pass through values
    function displayChangeGroupNameModal() {
        dispatch(
            setModal({ modalName: "changeGroupName", open: true, options: {} })
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
