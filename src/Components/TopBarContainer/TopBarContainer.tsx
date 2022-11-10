import React from "react";

type props = {
    children: JSX.Element;
};

export default function TopBar({ children }: props) {
    return (
        <div className='bg-chat-bg border-b border-r-0 border-groupBar-bg flex items-center justify-between font-semibold drop-shadow-md py-2 px-4 w-full h-16 text-white'>
            {children}
        </div>
    );
}
