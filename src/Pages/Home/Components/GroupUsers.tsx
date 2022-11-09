import React from "react";
import Tabs from "../../../Components/Tabs/Tabs";

type props = {
    isUserMenuOpen: boolean;
    toggleUserMenu: () => void;
};
// TODO add animation on close
// Todo move into users
export default function GroupUsers({ isUserMenuOpen, toggleUserMenu }: props) {
    return (
        <article
            className={`flex flex-col flex-grow m-sm:max-w-[250px] sm:fixed sm:right-0 sm:top-0 sm:h-screen sm:w-full sm:${
                isUserMenuOpen ? "translate-x-0" : "-translate-x-[100%]"
            }`}
        >
            {/* <div className='bg-chat-bg drop-shadow-md flex items-center font-semibold py-2 px-4 w-full h-16 text-white'></div> */}
            <div className='bg-groupInfo-bg text-white flex-grow'>
                {/* TODO add top bar with search */}
                {/* TODO create tabs for online and offline users */}
                <Tabs
                    components={createComponents()}
                    tabs={createTabs()}
                ></Tabs>
            </div>
            <button
                className='btn btn-circle absolute bottom-[10px] right-[10px] m-sm:hidden'
                onClick={toggleUserMenu}
            >
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
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            </button>
        </article>
    );

    function createComponents() {
        const components = new Map<string, JSX.Element>();
        components.set("online", <>Online Users</>);
        components.set("offline", <>Offline Users</>);

        return components;
    }

    function createTabs() {
        const tabs = ["online", "offline"];
        return tabs;
    }
}
