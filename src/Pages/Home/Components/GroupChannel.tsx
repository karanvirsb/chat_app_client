import React, { useState } from "react";
import ChannelContainer from "../../../Components/ChannelContainer/ChannelContainer";
import { useAppSelector } from "../../../Hooks/reduxHooks";
import { IGroup } from "../../../Redux/slices/groupApiSlice";
import GroupChat from "./GroupChat";
import GroupSidebarInfo from "./GroupSidebarInfo";
import GroupTopBar from "./GroupTopBar";
import GroupUsers from "./GroupUsers";

type props = {
    groupData: IGroup;
};

export default function GroupChannel({ groupData }: props) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(""); //TODO this is for when a different channel is selected for the chat
    const isSideBarOpen = useAppSelector((state) => state.sideBarReducer.open);

    return (
        <>
            {isSideBarOpen && (
                <GroupSidebarInfo
                    groupData={groupData}
                    setSelectedChannel={setSelectedChannel}
                ></GroupSidebarInfo>
            )}
            <ChannelContainer>
                <>
                    <GroupTopBar
                        isUserMenuOpen={isUserMenuOpen}
                        toggleUserMenu={toggleUserMenu}
                        selectedChannel={selectedChannel}
                    ></GroupTopBar>
                    <div className='flex flex-grow'>
                        <GroupChat channelId={selectedChannel}></GroupChat>
                        {isUserMenuOpen && (
                            <GroupUsers
                                isUserMenuOpen={isUserMenuOpen}
                                toggleUserMenu={toggleUserMenu}
                                groupId={groupData.groupId}
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
