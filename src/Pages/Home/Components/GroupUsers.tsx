import React from "react";
import Tabs from "../../../Components/Tabs/Tabs";

type props = {
    isUserMenuOpen: boolean;
};
// TODO add animation on close
// Todo move into users
export default function GroupUsers() {
    return (
        <article className='flex flex-col flex-grow max-w-[250px]  sm:-translate-x-[100%] sm:fixed'>
            {/* <div className='bg-chat-bg drop-shadow-md flex items-center font-semibold py-2 px-4 w-full h-16 text-white'></div> */}
            <div className='bg-groupInfo-bg text-white flex-grow'>
                {/* TODO add top bar with search */}
                {/* TODO create tabs for online and offline users */}
                <Tabs
                    components={createComponents()}
                    tabs={createTabs()}
                ></Tabs>
            </div>
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
