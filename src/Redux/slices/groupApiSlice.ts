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
        getGroup: builder.query<IGroup | string, string>({
            query: (groupId: string) => ({
                url: `/group/${groupId}`,
                method: "GET",
            }),
            transformResponse: (response: returnGroupData) => {
                if (response.success && response.data) {
                    return response.data;
                }
                return response.error;
            },
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
            async onQueryStarted({}, { queryFulfilled }) {
                try {
                    // checking if the query has been fullfilled
                    const { data: deletedGroup } = await queryFulfilled;

                    // if successful emit an event to update else to display error
                    if (
                        deletedGroup.success &&
                        deletedGroup.data !== undefined
                    ) {
                        socket.emit("update_the_group_name", deletedGroup.data);
                    } else {
                        socket.emit("error_occurred", deletedGroup.error);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            async onCacheEntryAdded(arg, { dispatch }) {
                // create a websocket connection when the cache subscription starts

                try {
                    // when data is received from the socket connection to the server,
                    // if it is a message and for the appropriate channel,
                    // update our query result with the received message
                    const listener = (event: MessageEvent) => {
                        dispatch(groupApiSlice.util.invalidateTags(["Groups"]));

                        socket.off("update_group_name"); // clean up
                    };

                    socket.on("update_group_name", listener);
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        deleteGroup: builder.mutation({
            query: (groupId: string) => ({
                url: "/group",
                method: "DELETE",
                body: { groupId },
            }),
            async onQueryStarted({}, { queryFulfilled }) {
                try {
                    // checking if the query has been fullfilled
                    const { data: deletedGroup } = await queryFulfilled;

                    // if successful emit an event to delete the group else to display error
                    if (
                        deletedGroup.success &&
                        deletedGroup.data !== undefined
                    ) {
                        socket.emit("delete_the_group", deletedGroup.data);
                    } else {
                        socket.emit("error_occurred", deletedGroup.error);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            async onCacheEntryAdded(arg, { dispatch }) {
                try {
                    const listener = () => {
                        dispatch(
                            groupApiSlice.util.invalidateTags(["Groups"])

                            // TODO for anyone in the group show a modal message
                            // TODO check if group is visible then show modal
                        );

                        socket.off("delete_group"); // clean up
                    };

                    socket.on("delete_group", listener);
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useGetGroupQuery,
    useGetGroupUsersQuery,
    useUpdateGroupNameMutation,
    useDeleteGroupMutation,
} = groupApiSlice;
