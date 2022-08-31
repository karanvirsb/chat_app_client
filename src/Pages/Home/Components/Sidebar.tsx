import React from "react";

const Sidebar = () => {
    return (
        <div className='grid grid-cols-[1fr_2fr]'>
            {/*  for groups*/}
            <div>
                <div>Logo</div>
                <div className='divider'></div>
            </div>
            {/* for chat */}
            <div>
                <div>Group Name</div>
                <div className='collapse'>
                    <input type='checkbox' />
                    <div className='collapse-title text-xl font-medium'>
                        Text Channels
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

export default Sidebar;
