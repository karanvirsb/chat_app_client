import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GroupChat from "./Components/GroupChat";
import GroupTopBar from "./Components/GroupTopBar";
import Sidebar from "./Components/Sidebar";
import GroupSidebarInfo from "./Components/GroupSidebarInfo";
import Users from "./Components/Users";

export default function Home() {
    const [sessionInfo, setSessionInfo] = useState<{
        doesSessionExist: boolean;
        userId: string;
        accessTokenPayload: any;
    } | null>(null);
    let session = useSessionContext();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);

    useEffect(() => {
        if (!session.loading) {
            let { doesSessionExist, userId, accessTokenPayload } = session;
            setSessionInfo({
                doesSessionExist,
                userId,
                accessTokenPayload,
            });
        }
    }, [session.loading]);

    return (
        <>
            {/* TODO redo layout with navbar */}
            <div className='flex h-screen'>
                <Sidebar></Sidebar>
                {/* Top Bar */}
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
                        {isUserMenuOpen && <Users></Users>}
                    </div>
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
