import React from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import DropDown from "../../../Components/DropDown/DropDown";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHooks";
import { setModal } from "../../../Redux/slices/modalSlice";
import { setSideBarClosed } from "../../../Redux/slices/SideBarSlice";

export default function GroupSidebarInfo() {
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);
    const dispatch = useAppDispatch();
    return (
        <div
            className={`flex flex-col sm:fixed sm:top-0 sm:left-[72px] sm:bottom-0 sm:z-[5] sm:${
                isSideBarOpen ? "translate-x-0" : "-translate-x-[100%]"
            } `}
        >
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
            <button
                className='btn btn-circle absolute bottom-[10px] right-[10px]'
                onClick={closeSideBar}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            </button>
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

    function closeSideBar() {
        dispatch(setSideBarClosed());
    }
}
