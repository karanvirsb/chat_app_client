import React, { useState } from "react";
import MeChat from "./MeChat";
import MeSideBarInfo from "./MeSideBarInfo";
import MeTopBar from "./MeTopBar";

export default function MeChannel() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    return (
        <>
            {isSideBarOpen && <MeSideBarInfo></MeSideBarInfo>}
            <div className='flex flex-col flex-grow'>
                <MeTopBar
                    isSideBarOpen={isSideBarOpen}
                    toggleSideBar={toggleSideBar}
                ></MeTopBar>
                <div className='flex flex-grow'>
                    <MeChat></MeChat>
                </div>
            </div>
        </>
    );

    function toggleSideBar() {
        setIsSideBarOpen((prev) => !prev);
    }
}
