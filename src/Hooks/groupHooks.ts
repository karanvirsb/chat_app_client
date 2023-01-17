import axios from "../API/axios";
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import useGroupSockets from "../Sockets/Hooks/useGroupSockets";
import useGetSession from "./useGetSession";

// setting up global variables
const baseurl = "http://localhost:8000/group";

// interfaces
export type IGroup = {
    groupName: string;
    groupId: string;
    inviteCode: string;
    dateCreated: Date;
}

export type IUser = {
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
}

export type returnGroupsData = {
    success: boolean;
    data: IGroup[] | undefined;
    error: string;
}

export type returnGroupData = {
    success: boolean;
    data: IGroup | undefined;
    error: string;
}

export type returnUserData = {
    success: boolean;
    data: IUser | undefined;
    error: string;
}

export type returnGroupUsersData = {
    success: boolean;
    data: IUser[] | undefined;
    error: string;
}

export type returnGroupUserData = {
    success: boolean;
    data: IGroupUsers | undefined;
    error: string;
}
type IUseGetGroupsQuery = UseQueryResult<string | IGroup[], unknown>
function useGetGroupsQuery({ userId }: { userId: string | undefined }): IUseGetGroupsQuery {
    const getGroups = async (): Promise<IGroup[] | string> => {
        const resp = await axios({
            url: `${baseurl}/userId/${userId ?? ""}`,
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
type IUseGetGroupQuery = UseQueryResult<string | IGroup, unknown>
function useGetGroupQuery({ groupId }: { groupId: string }): IUseGetGroupQuery {
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
type IUseGetGroupByInviteCodeQuery = UseQueryResult<string | IGroup, unknown>;
function useGetGroupByInviteCodeQuery({ inviteCode }: { inviteCode: string }): IUseGetGroupByInviteCodeQuery {
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
type IUseGetGroupUsersQuery = UseQueryResult<string | IUser[], unknown>
function useGetGroupUsersQuery({ groupId }: { groupId: string }): IUseGetGroupUsersQuery {
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
type IUseCreateGroupMutation = UseMutationResult<returnGroupData, unknown, {
    groupInfo: Partial<IGroup>;
    userId: string;
}, unknown>
function useCreateGroupMutation(): IUseCreateGroupMutation {
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
            await queryClient.invalidateQueries(["groups"]);
            if (data.data != null) {
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
                if(sessionInfo !== null){
                    send("join_rooms", {
                        rooms: [data.data.groupId],
                        userId: sessionInfo.userId,
                    });
                }
            }
        },
    });
}
type IUseUpdateGroupNameMutation = UseMutationResult<returnGroupData, unknown, {
    groupId: string;
    newGroupName: string;
}, unknown>
function useUpdateGroupNameMutation(): IUseUpdateGroupNameMutation {
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
            if (data.data != null) {
                send("updated_group_name", {
                    groupId: data.data?.groupId,
                    payload: { groupName: data.data.groupName },
                });
            }
        },
    });
}
type IUseDeleteGroupMutation = UseMutationResult<returnGroupData, unknown, {
    groupId: string;
}, unknown>
function useDeleteGroupMutation(): IUseDeleteGroupMutation {
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
            if (data.data != null)
                send("delete_the_group", {
                    groupId: data.data?.groupId,
                    payload: {},
                });
        },
    });
}
type IUseAddUserToGroupMutation = UseMutationResult<returnUserData, unknown, {
    userId: string;
    groupId: string;
}, unknown>
function useAddUserToGroupMutation(): IUseAddUserToGroupMutation {
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
        onSuccess: async (data) => {
            if (data.data != null) {
                await queryClient.invalidateQueries([`groups`]);
                // queryClient.invalidateQueries([`group-users-${data.data.groupId}`]);
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
        },
    });
}
type IUseLeaveGroupMutation = UseMutationResult<returnGroupUserData, unknown, {
    userId: string;
    groupId: string;
}, unknown>;
function useLeaveGroupMutation(): IUseLeaveGroupMutation {
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
        onSuccess: async (data) => {
            if (data.success && (data.data != null)) {
                await queryClient.invalidateQueries([`groups`]);

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
