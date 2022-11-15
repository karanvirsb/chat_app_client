// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const groupApiSlice = createApi({
    reducerPath: "groups",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/group" }),
    tagTypes: ["Groups"],
    endpoints: (builder) => ({
        getGroups: builder.query<returnGroupsData, string>({
            query: (userId) => ({ url: `userId/${userId}` }),
            providesTags: ["Groups"],
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
                url: `group/add`,
                method: "POST",
                body: {
                    groupInfo,
                    userId,
                },
            }),
            invalidatesTags: ["Groups"],
        }),
    }),
});

export const { useGetGroupsQuery } = groupApiSlice;
