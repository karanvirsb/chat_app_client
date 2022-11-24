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

export type returnGroupData = {
    success: boolean;
    data: IGroup | undefined;
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

function useGetGroupQuery({ groupId }: { groupId: string }) {
    const getGroups = async (): Promise<IGroup | string> => {
        const resp = await axios({
            url: `${baseurl}/${groupId}`,
            method: "GET",
        });
        const result: returnGroupData = resp.data;

        if (result.success && result.data !== undefined) {
            return result.data;
        } else {
            return result.error;
        }
    };

    return useQuery({
        queryKey: [`group-${groupId}`],
        queryFn: getGroups,
        enabled: groupId !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

function useGetGroupByInviteCodeQuery({ invite }: { invite: string }) {
    const getGroups = async (): Promise<IGroup | string> => {
        const resp = await axios({
            url: `${baseurl}/invite/${invite}`,
            method: "GET",
        });
        const result: returnGroupData = resp.data;

        if (result.success && result.data !== undefined) {
            return result.data;
        } else {
            return result.error;
        }
    };

    return useQuery({
        queryKey: [`group-invite-${invite}`],
        queryFn: getGroups,
        enabled: invite !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

export { useGetGroupsQuery, useGetGroupQuery, useGetGroupByInviteCodeQuery };
