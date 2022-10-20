import React from "react";
import Logo from "../../../assets/logo-nobg.png";
import Collapse from "../../../Components/Collapse/Collapse";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";

export default function Sidebar() {
    return (
        <div className='grid grid-cols-[1fr_5fr]'>
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
                {/* TODO make into a component */}
                <div className='dropdown dropdown-right dropdown-end mt-auto'>
                    <label tabIndex={0} className='btn btn-circle m-1'>
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
                                d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={1}
                        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
                    >
                        {/* TODO add settings button */}
                        <li>
                            <button className='btn' onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* for chat */}
            <div className='flex flex-col bg-groupInfo-bg text-white'>
                {/* TODO create drop down component for group */}
                <div className='border-b border-chat-bg flex items-center font-semibold drop-shadow-md py-2 px-4 w-full h-[60px] text-white'>
                    Group Name
                </div>
                <Collapse title='Text Channels'>
                    <ul>
                        <li>general</li>
                    </ul>
                </Collapse>
            </div>
        </div>
    );
}

async function logout() {
    await signOut();
    window.location.href = "/";
}
