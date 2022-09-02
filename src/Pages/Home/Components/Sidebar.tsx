import React from "react";
import Logo from "../../../assets/logo-nobg.svg";

const Sidebar = () => {
    return (
        <div className='grid grid-cols-[1fr_3fr]'>
            {/*  for groups*/}
            <div className=''>
                <div>
                    <img src={Logo}></img>
                </div>
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
