import React from "react";

const Users = () => {
    return (
        <div className='bg-groupInfo-bg px-4 text-white'>
            {/* TODO add top bar with search */}
            {/* TODO create tabs for online and offline users */}
            <div className='collapse collapse-open'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>Online</div>
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
    );
};

export default Users;
