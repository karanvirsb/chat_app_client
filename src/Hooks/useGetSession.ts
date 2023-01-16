import { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface IUseGetSession {
    sessionInfo: {
        doesSessionExist: boolean;
        userId: string;
        accessTokenPayload: any;
    } | null;
}

export default function useGetSession(): IUseGetSession {
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
    }, [session, session.loading]);

    return { sessionInfo };
}
