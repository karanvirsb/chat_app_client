import React from "react";
import ToggleSidebarBtn from "../../../Components/ToggleSidebarBtn/ToggleSidebarBtn";
import { useAppDispatch } from "../../../Hooks/reduxHooks";
import { setModal } from "../../../Redux/slices/modalSlice";

// type props = {
//     isSideBarOpen: boolean;
//     toggleSideBar: () => void;
// };

export default function MeTopBar() {
    const dispatch = useAppDispatch();
    return (
        <div className='bg-chat-bg border-b border-r-0 border-groupBar-bg flex items-center justify-between font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
            <div className='flex gap-4 items-center'>
                <ToggleSidebarBtn></ToggleSidebarBtn>
                {/*TODO Friends username goes here*/}
                <span>Friends Name</span>
                <button
                    className='btn btn-sm border-none bg-accent-color font-bold ml-4 text-black hover:bg-accent-hover sm:hidden'
                    onClick={displayAddFriendModal}
                >
                    Add Friends
                </button>
            </div>
        </div>
    );

    function displayAddFriendModal() {
        dispatch(
            setModal({
                modalName: "addFriend",
                open: true,
                options: {},
            })
        );
    }
}
