import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GroupChat from "./Components/GroupChat";
import GroupTopBar from "./Components/GroupTopBar";
import Sidebar from "./Components/Sidebar";
import GroupSidebarInfo from "./Components/GroupSidebarInfo";
import GroupUsers from "./Components/GroupUsers";
import GroupChannel from "./Components/GroupChannel";
import MeChannel from "./Components/MeChannel";

export default function Home() {
    const [sessionInfo, setSessionInfo] = useState<{
        doesSessionExist: boolean;
        userId: string;
        accessTokenPayload: any;
    } | null>(null);
    let session = useSessionContext();

    const [tab, setTab] = useState<"group" | "me">("me");
    const [tabId, setTabId] = useState(""); // can be a userId or groupId

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
                <Sidebar setTab={setTab} setTabId={setTabId}></Sidebar>
                {tab === "group" && <GroupChannel></GroupChannel>}
                {tab === "me" && <MeChannel></MeChannel>}
            </div>
        </>
    );
}
