import React, { useState } from "react";
import GroupChat from "./GroupChat";
import GroupSidebarInfo from "./GroupSidebarInfo";
import GroupTopBar from "./GroupTopBar";
import GroupUsers from "./GroupUsers";

export default function GroupChannel() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);

    return (
        <>
            {isSideBarOpen && <GroupSidebarInfo></GroupSidebarInfo>}
            <div className='flex flex-col flex-grow'>
                <GroupTopBar
                    isSideBarOpen={isSideBarOpen}
                    isUserMenuOpen={isUserMenuOpen}
                    toggleSideBar={toggleSideBar}
                    toggleUserMenu={toggleUserMenu}
                ></GroupTopBar>
                <div className='flex flex-grow'>
                    <GroupChat></GroupChat>
                    {isUserMenuOpen && (
                        <GroupUsers
                            isUserMenuOpen={isUserMenuOpen}
                        ></GroupUsers>
                    )}
                </div>
            </div>
        </>
    );

    function toggleSideBar() {
        setIsSideBarOpen((prev) => !prev);
    }

    function toggleUserMenu() {
        setIsUserMenuOpen((prev) => !prev);
    }
}
