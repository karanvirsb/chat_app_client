// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import socket from "../../Sockets";

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
        getGroups: builder.query<IGroup[] | string, string | undefined>({
            query: (userId) => {
                return { url: `/group/userId/${userId}` };
            },
            transformResponse: (response: returnGroupsData) => {
                if (response.success && response.data !== undefined) {
                    return response.data;
                } else {
                    return response.error;
                }
            },
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
        getGroupUsers: builder.query<returnGroupUserData, string>({
            query: (groupId: string) => ({
                url: `/group/users/${groupId}`,
                method: "GET",
            }),
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
                body: { groupId, newGroupName: newName },
            }),
            async onQueryStarted({}, { queryFulfilled, dispatch }) {
                try {
                    // checking if the query has been fullfilled
                    const { data: updatedGroupName } = await queryFulfilled;

                    // if successful emit an event to update else to display error
                    if (
                        updatedGroupName.success &&
                        updatedGroupName.data !== undefined
                    ) {
                        socket.emit(
                            "update_the_group_name",
                            updatedGroupName.data
                        );
                    } else {
                        socket.emit("error_occurred", updatedGroupName.error);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            invalidatesTags: (result, err, arg) => [
                "Groups",
                { type: "Group", id: arg.groupId },
            ],
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useGetGroupQuery,
    useGetGroupUsersQuery,
    useUpdateGroupNameMutation,
} = groupApiSlice;
