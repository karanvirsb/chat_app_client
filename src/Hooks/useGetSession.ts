import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function useGetSession() {
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
