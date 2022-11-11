import React, { useState } from "react";
import ChannelContainer from "../../../Components/ChannelContainer/ChannelContainer";
import { useAppSelector } from "../../../Hooks/reduxHooks";
import GroupChat from "./GroupChat";
import GroupSidebarInfo from "./GroupSidebarInfo";
import GroupTopBar from "./GroupTopBar";
import GroupUsers from "./GroupUsers";

export default function GroupChannel() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
    const isSideBarOpen = useAppSelector((state) => state.sideBarReducer.open);
    return (
        <>
            {isSideBarOpen && <GroupSidebarInfo></GroupSidebarInfo>}
            <ChannelContainer>
                <>
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
                </>
            </ChannelContainer>
        </>
    );
    function toggleUserMenu() {
        setIsUserMenuOpen((prev) => !prev);
    }
}
