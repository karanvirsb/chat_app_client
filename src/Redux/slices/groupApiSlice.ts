// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import socket from "../../Sockets";
import { isGroupArray } from "../../test/validation/schemaValidation";

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
        getGroups: builder.query<IGroup[] | string, string>({
            query: (userId) => ({ url: `/group/userId/${userId}` }),
            transformResponse: (response: returnGroupsData) => {
                if (response.success && response.data !== undefined) {
                    return response.data;
                } else {
                    return response.error;
                }
            },
            providesTags: ["Groups"],
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                // create a websocket connection when the cache subscription starts
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded;
                    // when data is received from the socket connection to the server,
                    // if it is a message and for the appropriate channel,
                    // update our query result with the received message
                    const listener = (event: MessageEvent) => {
                        const data: IGroup = JSON.parse(event.data);
                        updateCachedData((draft: IGroup[] | string) => {
                            if (isGroupArray(draft)) {
                                draft.map((group) =>
                                    group.groupId === data.groupId
                                        ? data
                                        : group
                                );
                                return draft;
                            }
                        });
                    };
                    socket.on("update_group_name", listener);
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved;
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                socket.off("update_group_name");
            },
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
                body: { groupId, newName },
            }),
            async onQueryStarted({}, { queryFulfilled }) {
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
