import React from "react";
import Users from "./Users";

const Chat = () => {
    return (
        <div className='flex flex-col py-4 bg-chat-bg'>
            <div className='w-full btn bg-chat-bg'>General</div>
            <div className='grid grid-cols-[2fr_1fr] w-full h-full'>
                <div className='flex flex-col h-full'>
                    <div className='flex-grow w-full p-4'>
                        {/* Create chat component */}
                    </div>
                    <div className='input-group p-4'>
                        <input
                            type='text'
                            placeholder='Send a message'
                            className='input input-bordered w-full focus:outline-none'
                        />
                    </div>
                </div>
                <Users></Users>
            </div>
            {/* Create toggle for users */}
        </div>
    );
};

export default Chat;
