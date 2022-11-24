import axios from "../../../API/axios";
import { useQuery } from "@tanstack/react-query";

// setting up global variables
const baseurl = "http://localhost:8000/group";

// types
export interface IGroup {
    groupName: string;
    groupId: string;
    inviteCode: string;
    dateCreated: Date;
}

export type returnGroupsData = {
    success: boolean;
    data: IGroup[] | undefined;
    error: string;
};

function useGetGroupsQuery({ userId }: { userId: string | undefined }) {
    const getGroups = async (): Promise<IGroup[] | string> => {
        const resp = await axios({
            url: `${baseurl}/userId/${userId}`,
            method: "GET",
        });
        const result: returnGroupsData = resp.data;

        if (result.success && result.data !== undefined) {
            return result.data;
        } else {
            return result.error;
        }
    };

    return useQuery({
        queryKey: [`groups-${userId}`],
        queryFn: getGroups,
        enabled: userId !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

export { useGetGroupsQuery };
