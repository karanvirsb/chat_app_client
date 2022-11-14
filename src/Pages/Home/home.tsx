import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import GroupChannel from "./Components/GroupChannel";
import MeChannel from "./Components/MeChannel";

export default function Home() {
    const [tab, setTab] = useState<"group" | "me">("me");
    const [tabId, setTabId] = useState(""); // can be a userId or groupId

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
