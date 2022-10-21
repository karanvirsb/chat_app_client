import React, { useEffect, useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import Users from "./Components/Users";

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
        <div className='grid grid-cols-[1.25fr_3fr_1fr] h-screen'>
            <Sidebar></Sidebar>
            <Chat></Chat>
            <Users></Users>
        </div>
    );
};

export default Home;
