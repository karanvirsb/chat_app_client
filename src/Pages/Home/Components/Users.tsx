import React from "react";

const Users = () => {
    return (
        <div>
            <div className='collapse'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>Online</div>
                <div className='collapse-content'>
                    <ul>
                        <li>general</li>
                    </ul>
                </div>
            </div>
            <div className='collapse'>
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
