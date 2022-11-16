import React, { useState } from "react";
import ChannelContainer from "../../../Components/ChannelContainer/ChannelContainer";
import { useAppSelector } from "../../../Hooks/reduxHooks";
import GroupChat from "./GroupChat";
import GroupSidebarInfo from "./GroupSidebarInfo";
import GroupTopBar from "./GroupTopBar";
import GroupUsers from "./GroupUsers";

type props = {
    groupId: string;
};

export default function GroupChannel({ groupId }: props) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(""); //TODO this is for when a different channel is selected for the chat
    const isSideBarOpen = useAppSelector((state) => state.sideBarReducer.open);

    return (
        <>
            {isSideBarOpen && (
                <GroupSidebarInfo
                    groupId={groupId}
                    setSelectedChannel={setSelectedChannel}
                ></GroupSidebarInfo>
            )}
            <ChannelContainer>
                <>
                    <GroupTopBar
                        isUserMenuOpen={isUserMenuOpen}
                        toggleUserMenu={toggleUserMenu}
                    ></GroupTopBar>
                    <div className='flex flex-grow'>
                        <GroupChat channelId={selectedChannel}></GroupChat>
                        {isUserMenuOpen && (
                            <GroupUsers
                                isUserMenuOpen={isUserMenuOpen}
                                toggleUserMenu={toggleUserMenu}
                                groupId={groupId}
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
