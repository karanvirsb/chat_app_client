import React from "react";

type props = {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
    isUserMenuOpen: boolean;
    toggleUserMenu: () => void;
};

export default function Chat({
    isSideBarOpen,
    toggleSideBar,
    isUserMenuOpen,
    toggleUserMenu,
}: props) {
    return (
        <div className='flex flex-col'>
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
                    {/*TODO Channel name goes here*/}
                    <span>General</span>
                </div>
                <button onClick={toggleUserMenu}>
                    {isUserMenuOpen ? (
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
                                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 text-gray-400'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                            />
                        </svg>
                    )}
                </button>
            </div>
            <div className='bg-chat-bg flex-grow'>
                <div className='grid grid-cols-[3fr_1fr] w-full h-full'>
                    <div className='flex flex-col h-full'>
                        <div className='flex-grow p-4 w-full '>
                            {/* TODO Create chat component */}
                        </div>
                        <div className='input-group p-4'>
                            <input
                                type='text'
                                placeholder='Send a message'
                                className='input input-bordered bg-[#2a303c] w-full focus:outline-none'
                            />
                        </div>
                    </div>
                    {/* <Users></Users> */}
                </div>
            </div>
        </div>
    );
}
