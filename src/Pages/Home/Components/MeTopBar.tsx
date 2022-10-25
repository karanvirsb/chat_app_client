import React from "react";

type props = {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
};

export default function MeTopBar({ isSideBarOpen, toggleSideBar }: props) {
    return (
        <div className='bg-chat-bg border-b border-r-0 border-groupBar-bg flex items-center justify-between font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
            <div className='flex gap-4'>
                <button onClick={toggleSideBar}>
                    {isSideBarOpen ? (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 hover:text-black'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 hover:text-black'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                            />
                        </svg>
                    )}
                </button>
                {/*TODO Friends username goes here*/}
                <span>Friends Name</span>
                <button className='btn class'>Add Friend</button>
            </div>
        </div>
    );
}
