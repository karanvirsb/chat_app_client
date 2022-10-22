import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import SidebarInfo from "./Components/SidebarInfo";
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
            <div className='grid grid-cols-[0.25fr_1fr_3fr_1fr] h-screen'>
                <Sidebar></Sidebar>
                {isSideBarOpen && <SidebarInfo></SidebarInfo>}
                <Chat
                    isSideBarOpen={isSideBarOpen}
                    toggleSideBar={toggleSideBar}
                    isUserMenuOpen={isUserMenuOpen}
                    toggleUserMenu={toggleUserMenu}
                ></Chat>
                <Users isUserMenuOpen={isUserMenuOpen}></Users>
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
