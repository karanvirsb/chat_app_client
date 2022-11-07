import React, { useState } from "react";
import { useAppSelector } from "../../../Hooks/reduxHooks";
import GroupChat from "./GroupChat";
import GroupSidebarInfo from "./GroupSidebarInfo";
import GroupTopBar from "./GroupTopBar";
import GroupUsers from "./GroupUsers";

export default function GroupChannel() {
    // const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);
    return (
        <>
            {isSideBarOpen && <GroupSidebarInfo></GroupSidebarInfo>}
            <div
                className={`flex flex-col flex-grow ${
                    isSideBarOpen
                        ? "translate-x-[307.375px]"
                        : "translate-x-[0px]"
                }`}
            >
                <GroupTopBar
                    isUserMenuOpen={isUserMenuOpen}
                    toggleUserMenu={toggleUserMenu}
                ></GroupTopBar>
                <div className='flex flex-grow'>
                    <GroupChat></GroupChat>
                    {isUserMenuOpen && (
                        <GroupUsers
                            isUserMenuOpen={isUserMenuOpen}
                            toggleUserMenu={toggleUserMenu}
                        ></GroupUsers>
                    )}
                </div>
            </div>
        </>
    );
    function toggleUserMenu() {
        setIsUserMenuOpen((prev) => !prev);
    }
}
