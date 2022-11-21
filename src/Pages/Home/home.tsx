import React from "react";
import Sidebar from "./Components/Sidebar";
import GroupChannel from "./Components/GroupChannel";
import MeChannel from "./Components/MeChannel";
import useLocalStorage from "../../Hooks/useLocalStorage";

export default function Home() {
    // const [tab, setTab] = useState<"group" | "me">("me");
    const [tab, setTab] = useLocalStorage<"group" | "me">("groupOrMeTab", "me");
    const [tabId, setTabId] = useLocalStorage<string>("tabId", "-1"); // can be a userId or groupId

    return (
        <>
            <div className='flex h-screen'>
                <Sidebar setTab={setTab} setTabId={setTabId}></Sidebar>
                {tab === "group" && (
                    <GroupChannel groupId={tabId}></GroupChannel>
                )}
                {tab === "me" && <MeChannel></MeChannel>}
            </div>
        </>
    );
}
