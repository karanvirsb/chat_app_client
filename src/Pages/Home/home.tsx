import React, { useEffect, useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import {
    doesSessionExist,
    useSessionContext,
} from "supertokens-auth-react/recipe/session";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";

const Home = () => {
    const [sessionInfo, setSessionInfo] = useState<{
        doesSessionExist: boolean;
        userId: string;
        accessTokenPayload: any;
    } | null>(null);
    let session = useSessionContext();

    const onLogout = async () => {
        await signOut();
        window.location.href = "/";
    };

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
        <div className='grid grid-cols-[1fr_3fr] h-screen'>
            <Sidebar></Sidebar>
            <Chat></Chat>
        </div>
    );
};

export default Home;
