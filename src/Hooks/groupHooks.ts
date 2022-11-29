import axios from "../API/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useGroupSockets from "../Sockets/Hooks/useGroupSockets";
import useGetSession from "./useGetSession";

// setting up global variables
const baseurl = "http://localhost:8000/group";

// types
export interface IGroup {
    groupName: string;
    groupId: string;
    inviteCode: string;
    dateCreated: Date;
}

export interface IUser {
    userId: string;
    username: string;
    email: string;
    status: string;
    time_joined: Date;
    roles: string[];
    groupId: string;
}

export type IGroupUsers = {
    gId: string;
    uId: string;
    roles: number[];
};

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

export type returnUserData = {
    success: boolean;
    data: IUser | undefined;
    error: string;
};

export type returnGroupUsersData = {
    success: boolean;
    data: IUser[] | undefined;
    error: string;
};

export type returnGroupUserData = {
    success: boolean;
    data: IGroupUsers | undefined;
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
        // staleTime: 10 * 60 * 1000, // mins * sec * ms
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
        // staleTime: 10 * 60 * 1000, // mins * sec * ms
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
        // staleTime: 10 * 60 * 1000, // mins * sec * ms
    });
}

function useGetGroupUsersQuery({ groupId }: { groupId: string }) {
    const getGroupUsers = async (): Promise<IUser[] | string> => {
        const resp = await axios({
            url: `${baseurl}/users/${groupId}`,
            method: "GET",
        });
        const result: returnGroupUsersData = resp.data;

        if (result.success && result.data !== undefined) {
            return result.data;
        } else {
            return result.error;
        }
    };

    return useQuery({
        queryKey: [`group-users-${groupId}`],
        queryFn: getGroupUsers,
        enabled: groupId !== undefined,
    });
}

// MUTATIONS

function useCreateGroupMutation() {
    const queryClient = useQueryClient();
    const send = useGroupSockets();
    const { sessionInfo } = useGetSession();
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
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["groups"]);
            if (data.data) {
                await axios({
                    url: "http://localhost:8000/groupChannel",
                    method: "POST",
                    data: {
                        channelInfo: {
                            channelName: "general",
                            groupId: data.data.groupId,
                        },
                    },
                });

                send("join_rooms", {
                    rooms: [data.data.groupId],
                    userId: sessionInfo?.userId ? sessionInfo?.userId : "",
                });
            }
        },
    });
}

function useUpdateGroupNameMutation() {
    // const queryClient = useQueryClient();
    const send = useGroupSockets();
    const updateGroupName = async ({
        groupId,
        newGroupName,
    }: {
        groupId: string;
        newGroupName: string;
    }): Promise<returnGroupData> => {
        const resp = await axios({
            url: `${baseurl}/name`,
            method: "PUT",
            data: {
                groupId,
                newGroupName,
            },
        });
        const result: returnGroupData = resp.data;
        return result;
    };
    // TODO change with sockets for everyone
    return useMutation({
        mutationFn: updateGroupName,
        onSuccess: (data) => {
            // queryClient.invalidateQueries(["groups"]);
            if (data.data) {
                send("updated_group_name", {
                    groupId: data.data?.groupId,
                    payload: { groupName: data.data.groupName },
                });
            }
        },
    });
}

function useDeleteGroupMutation() {
    // const queryClient = useQueryClient();
    const send = useGroupSockets();
    const deleteGroup = async ({
        groupId,
    }: {
        groupId: string;
    }): Promise<returnGroupData> => {
        const resp = await axios({
            url: `${baseurl}`,
            method: "DELETE",
            data: {
                groupId,
            },
        });
        const result: returnGroupData = resp.data;
        return result;
    };
    // TODO change with sockets for everyone
    return useMutation({
        mutationFn: deleteGroup,
        onSuccess: (data) => {
            // queryClient.invalidateQueries(["groups"]);
            if (data.data)
                send("delete_the_group", {
                    groupId: data.data?.groupId,
                    payload: {},
                });
        },
    });
}

function useAddUserToGroupMutation() {
    const queryClient = useQueryClient();
    const send = useGroupSockets();
    const addUserToGroup = async ({
        userId,
        groupId,
    }: {
        userId: string;
        groupId: string;
    }): Promise<returnUserData> => {
        const resp = await axios({
            url: `${baseurl}/user`,
            method: "POST",
            data: {
                userId,
                groupId,
            },
        });
        const result: returnUserData = resp.data;
        return result;
    };
    // TODO change with sockets for everyone
    return useMutation({
        mutationFn: addUserToGroup,
        onSuccess: (data) => {
            if (data.success && data.data) {
                queryClient.invalidateQueries([`groups`]);
                // queryClient.invalidateQueries([`group-users-${data.data.groupId}`]);
                if (data.data) {
                    // send request to join room socket
                    send("join_rooms", {
                        rooms: [data.data.groupId],
                        userId: data.data.userId,
                    });
                    // send to invalidate group users
                    send("update_the_group_users", {
                        groupId: data.data.groupId,
                        payload: { userInfo: { ...data.data } },
                    });
                }
            }
        },
    });
}

function useLeaveGroupMutation() {
    const queryClient = useQueryClient();
    const send = useGroupSockets();
    const removeUserFromGroup = async ({
        userId,
        groupId,
    }: {
        userId: string;
        groupId: string;
    }): Promise<returnGroupUserData> => {
        const resp = await axios({
            url: `${baseurl}/user`,
            method: "DELETE",
            data: {
                userId,
                groupId,
            },
        });
        const result: returnGroupUserData = resp.data;
        return result;
    };
    // TODO change with sockets for everyone
    return useMutation({
        mutationFn: removeUserFromGroup,
        onSuccess: (data) => {
            if (data.success && data.data) {
                queryClient.invalidateQueries([`groups`]);

                send("leave_room", {
                    groupId: data.data.gId,
                    payload: {
                        userId: data.data.uId,
                    },
                });

                send("leave_the_group", {
                    groupId: data.data.gId,
                    payload: { userId: data.data.uId },
                });
                // queryClient.invalidateQueries([`group-users-${data.data.gId}`]);
            }
        },
    });
}

export {
    useGetGroupsQuery,
    useGetGroupQuery,
    useGetGroupByInviteCodeQuery,
    useCreateGroupMutation,
    useGetGroupUsersQuery,
    useUpdateGroupNameMutation,
    useDeleteGroupMutation,
    useAddUserToGroupMutation,
    useLeaveGroupMutation,
};
