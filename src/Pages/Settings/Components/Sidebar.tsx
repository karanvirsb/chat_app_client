import React from "react";

// TODO Add account settings and back button
// TODO add tab display
export default function Sidebar() {
    const tabs = ["Account"];
    return (
        <nav className='flex flex-col bg-groupInfo-bg max-w-[250px] h-screen'>
            <button>Back</button>
            <div>
                <h2>User Settings</h2>
                <ul className='w-full'>
                    {tabs.map((tab, index) => {
                        return (
                            <li className='w-full text-center '>
                                <a className='tab hover:bg-[#2A303C] text-[#DFDFDF] w-full'>
                                    {tab}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
