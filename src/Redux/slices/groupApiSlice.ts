// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IGroup {
    groupName: string;
    groupId: string;
    inviteCode: string;
    dateCreated: Date;
}

export const groupApiSlice = createApi({
    reducerPath: "groups",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/group" }),
    tagTypes: ["Groups"],
    endpoints: (builder) => ({
        getGroups: builder.query<IGroup[], string>({
            query: (userId) => ({ url: `userId/${userId}` }),
        }),
    }),
});

export const { useGetGroupsQuery } = groupApiSlice;
