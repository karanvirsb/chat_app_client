import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GroupChat from "./Components/GroupChat";
import GroupTopBar from "./Components/GroupTopBar";
import Sidebar from "./Components/Sidebar";
import GroupSidebarInfo from "./Components/GroupSidebarInfo";
import GroupUsers from "./Components/GroupUsers";
import GroupChannel from "./Components/GroupChannel";

export default function Home() {
    const [sessionInfo, setSessionInfo] = useState<{
        doesSessionExist: boolean;
        userId: string;
        accessTokenPayload: any;
    } | null>(null);
    let session = useSessionContext();

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
                <GroupChannel></GroupChannel>
            </div>
        </>
    );
}
