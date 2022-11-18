import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import GroupChannel from "./Components/GroupChannel";
import MeChannel from "./Components/MeChannel";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { IGroup } from "../../Redux/slices/groupApiSlice";

export default function Home() {
    // const [tab, setTab] = useState<"group" | "me">("me");
    const [tab, setTab] = useLocalStorage<"group" | "me">("groupOrMeTab", "me");
    const [tabId, setTabId] = useLocalStorage<string>("tabId", "-1"); // can be a userId or groupId
    const [selectedGroupData, setSelectedGroupData] = useLocalStorage<IGroup>(
        "selectedGroupData",
        { groupId: "", groupName: "", dateCreated: new Date(), inviteCode: "" }
    );

    return (
        <>
            <div className='flex h-screen'>
                <Sidebar
                    setTab={setTab}
                    setTabId={setTabId}
                    setSelectedGroupData={setSelectedGroupData}
                ></Sidebar>
                {tab === "group" && (
                    <GroupChannel groupData={selectedGroupData}></GroupChannel>
                )}
                {tab === "me" && <MeChannel></MeChannel>}
            </div>
        </>
    );
}
