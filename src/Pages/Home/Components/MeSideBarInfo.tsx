import React from "react";
import { useAppDispatch } from "../../../Hooks/reduxHooks";

// TODO gather user id and then map through friends list
export default function MeSideBarInfo() {
    const dispatch = useAppDispatch();
    return (
        <div className='flex flex-col md:min-w-[235.375px]'>
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
