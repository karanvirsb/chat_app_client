import React from "react";

const Users = () => {
    return (
        <div className='flex flex-col'>
            <div className='bg-chat-bg drop-shadow-md flex items-center font-semibold py-2 px-4 w-full h-16 text-white'></div>
            <div className='bg-groupInfo-bg px-4 text-white flex-grow'>
                {/* TODO add top bar with search */}
                {/* TODO create tabs for online and offline users */}
                <div className='collapse collapse-open'>
                    <input type='checkbox' />
                    <div className='collapse-title text-xl font-medium'>
                        Online
                    </div>
                    <div className='collapse-content'>
                        <ul>
                            <li>general</li>
                        </ul>
                    </div>
                </div>
                <div className='collapse collapse-open'>
                    <input type='checkbox' />
                    <div className='collapse-title text-xl font-medium'>
                        Offline
                    </div>
                    <div className='collapse-content'>
                        <ul>
                            <li>general</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
