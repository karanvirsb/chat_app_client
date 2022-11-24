import axios from "../../../API/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        queryKey: [`groups`],
        queryFn: getGroups,
        enabled: userId !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

function useGetGroupQuery({ groupId }: { groupId: string }) {
    const getGroup = async (): Promise<IGroup | string> => {
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
        queryFn: getGroup,
        enabled: groupId !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

function useGetGroupByInviteCodeQuery({ inviteCode }: { inviteCode: string }) {
    const getGroup = async (): Promise<IGroup | string> => {
        const resp = await axios({
            url: `${baseurl}/invite/${inviteCode}`,
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
        queryKey: [`group-invite-${inviteCode}`],
        queryFn: getGroup,
        enabled: inviteCode !== undefined,
        staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

function useCreateGroupMutation() {
    const queryClient = useQueryClient();
    const createGroup = async ({
        groupInfo,
        userId,
    }: {
        groupInfo: Partial<IGroup>;
        userId: string;
    }): Promise<returnGroupData> => {
        const resp = await axios({
            url: `${baseurl}`,
            method: "POST",
            data: {
                groupInfo,
                userId,
            },
        });
        const result: returnGroupData = resp.data;
        return result;
    };

    return useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            queryClient.invalidateQueries(["groups"]);
        },
    });
}

export {
    useGetGroupsQuery,
    useGetGroupQuery,
    useGetGroupByInviteCodeQuery,
    useCreateGroupMutation,
};
