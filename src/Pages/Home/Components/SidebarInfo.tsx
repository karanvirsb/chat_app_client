import React from "react";
import Collapse from "../../../Components/Collapse/Collapse";
import DropDown from "../../../Components/DropDown/DropDown";

const SidebarInfo = () => {
    return (
        <div className='flex flex-col'>
            <DropDown
                btnChildren='Group Name'
                btnClass='btn font-bold h-16 rounded-none w-full'
                dropDownClass='flex flex-col items-center'
                listClass='relative top-[125%] w-[90%]'
                symbol={true}
            >
                <>
                    <li>
                        <button className='btn bg-btn-primary border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-primary-hover'>
                            Change Group Name
                        </button>
                    </li>
                    <li>
                        <button className='btn bg-btn-primary border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-primary-hover'>
                            Invite User
                        </button>
                    </li>
                    <li>
                        <button className='btn bg-btn-mutations border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-mutations-hover'>
                            Delete Group
                        </button>
                    </li>
                    <li>
                        <button className='btn bg-btn-mutations border-none font-bold mb-2 text-btn-mutations-text hover:bg-btn-mutations-hover'>
                            Leave Group
                        </button>
                    </li>
                </>
            </DropDown>
            {/* <div className='bg-groupInfo-bg border-b border-chat-bg flex items-center font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
                    Group Name
                </div> */}
            <div className='bg-groupInfo-bg flex-grow text-white'>
                <Collapse title='Text Channels'>
                    <ul>
                        <li>general</li>
                    </ul>
                </Collapse>
            </div>
        </div>
    );
};

export default SidebarInfo;
