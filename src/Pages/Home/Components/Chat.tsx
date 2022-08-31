import React from "react";

const Chat = () => {
    return (
        <div className='flex flex-col'>
            <div className='outline outline-black flex-grow my-4'></div>
            <div>
                <input
                    type='text'
                    placeholder='Send a message'
                    className='input w-full max-w-xs'
                />
                <button className='btn'>Send</button>
            </div>
        </div>
    );
};

export default Chat;
