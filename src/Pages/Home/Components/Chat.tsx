import React from "react";

const Chat = () => {
    return (
        <div className='flex flex-col py-4 bg-chat-bg'>
            <div className='w-full bg-chat-bg'>General</div>
            {/* Create toggle for users */}
            <div className='flex-grow w-full'></div>
            <div className='input-group'>
                <input
                    type='text'
                    placeholder='Send a message'
                    className='input input-bordered w-full p-4 focus:outline-none'
                />
            </div>
        </div>
    );
};

export default Chat;
