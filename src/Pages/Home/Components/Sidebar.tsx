import React from "react";
import Logo from "../../../assets/logo-nobg.png";

const Sidebar = () => {
    return (
        <div className='grid grid-cols-[1fr_3fr]'>
            {/*  for groups*/}
            <div className='flex flex-col items-center bg-groupBar-bg py-4 px-2'>
                <button className='btn btn-circle'>
                    <img src={Logo} className='rounded-full'></img>
                </button>
                <div className='divider'></div>
                <ul></ul>
                <button className='btn btn-circle'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 4.5v15m7.5-7.5h-15'
                        />
                    </svg>
                </button>
            </div>
            {/* for chat */}
            <div className='flex flex-col items-center bg-groupInfo-bg text-white py-4 px-2'>
                <div className='border-b border-b-black w-full'>Group Name</div>
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
