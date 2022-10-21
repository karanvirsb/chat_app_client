import React from "react";
import Users from "./Users";

const Chat = () => {
    return (
        <div className='flex flex-col'>
            <div className='bg-chat-bg border-b border-groupBar-bg flex items-center font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
                General
            </div>
            <div className='bg-chat-bg flex-grow'>
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
                {/* TODO Create toggle for users */}
            </div>
        </div>
    );
};

export default Chat;
