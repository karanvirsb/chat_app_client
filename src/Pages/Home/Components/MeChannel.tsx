import React, { useState } from "react";
import { useAppSelector } from "../../../Hooks/reduxHooks";
import MeChat from "./MeChat";
import MeSideBarInfo from "./MeSideBarInfo";
import MeTopBar from "./MeTopBar";

export default function MeChannel() {
    // const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);
    return (
        <>
            {isSideBarOpen && <MeSideBarInfo></MeSideBarInfo>}
            <div
                className={`flex flex-col flex-grow ${
                    isSideBarOpen
                        ? "sm:translate-x-[307.375px]"
                        : "sm:translate-x-[0px]"
                }`}
            >
                <MeTopBar></MeTopBar>
                <div className='flex flex-grow'>
                    <MeChat></MeChat>
                </div>
            </div>
        </>
    );
}
