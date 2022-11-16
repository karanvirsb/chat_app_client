// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export type returnGroupUserData = {
    success: boolean;
    data: IUser[] | undefined;
    error: string;
};

export const groupApiSlice = createApi({
    reducerPath: "groups",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Groups", "Group"],
    endpoints: (builder) => ({
        getGroups: builder.query<returnGroupsData, string>({
            query: (userId) => ({ url: `/group/userId/${userId}` }),
            providesTags: ["Groups"],
        }),
        getGroup: builder.query<returnGroupData, string>({
            query: (groupId: string) => ({
                url: `/group/${groupId}`,
                method: "GET",
            }),
            providesTags: ["Group"],
        }),
        createGroup: builder.mutation<
            returnGroupData,
            { groupInfo: Partial<IGroup>; userId: string }
        >({
            query: ({
                groupInfo,
                userId,
            }: {
                groupInfo: Partial<IGroup>;
                userId: string;
            }) => ({
                url: `/group`,
                method: "POST",
                body: {
                    groupInfo,
                    userId,
                },
            }),
            invalidatesTags: ["Groups"],
        }),
        updateGroupName: builder.mutation<
            returnGroupData,
            { groupId: string; newName: string }
        >({
            query: ({
                groupId,
                newName,
            }: {
                groupId: string;
                newName: string;
            }) => ({
                url: "/group/name",
                method: "PUT",
                body: { groupId, newName },
            }),
            invalidatesTags: ["Groups", "Group"],
        }),
        getGroupUsers: builder.query<returnGroupUserData, string>({
            query: (groupId: string) => ({
                url: `/group/users/${groupId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useGetGroupQuery,
    useUpdateGroupNameMutation,
    useGetGroupUsersQuery,
} = groupApiSlice;
