import React from "react";

type props = {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
    isUserMenuOpen: boolean;
    toggleUserMenu: () => void;
};

export default function GroupChat() {
    return (
        // <div className=''>
        <div className='bg-chat-bg flex flex-col flex-grow'>
            <div className='grid grid-cols-[3fr_1fr] w-full h-full'>
                <div className='flex flex-col h-full'>
                    <div className='flex-grow p-4 w-full '>
                        {/* TODO Create chat component */}
                    </div>
                    <div className='input-group p-4'>
                        <input
                            type='text'
                            placeholder='Send a message'
                            className='input input-bordered bg-[#2a303c] w-full focus:outline-none'
                        />
                    </div>
                </div>
                {/* <Users></Users> */}
            </div>
        </div>
        // </div>
    );
}
