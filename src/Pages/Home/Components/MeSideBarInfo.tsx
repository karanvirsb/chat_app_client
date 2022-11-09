import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHooks";

// TODO gather user id and then map through friends list
export default function MeSideBarInfo() {
    const dispatch = useAppDispatch();
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);
    return (
        <div
            className={`flex flex-col min-w-[250px] sm:fixed sm:top-0 sm:left-[72px] sm:bottom-0 sm:z-[5] sm:${
                isSideBarOpen ? "translate-x-0" : "-translate-x-[100%]"
            } `}
        >
            <h1 className='bg-groupInfo-bg border-b border-chat-bg flex items-center font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
                Friends
            </h1>
            <div className='bg-groupInfo-bg flex-grow text-white'>
                {/* TODO make a user component */}
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}
