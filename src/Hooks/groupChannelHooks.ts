import axios from "../API/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useGroupSockets from "../Sockets/Hooks/useGroupSockets";
import useGetSession from "./useGetSession";

// setting up global variables
const baseurl = "http://localhost:8000/channel";

export interface IGroupChannel {
    channelId: string;
    channelName: string;
    dateCreated: Date;
    groupId: string;
}

export type returnGroupChannel = {
    success: boolean;
    data: IGroupChannel | undefined;
    error: string;
};

function useGetGroupChannelQuery({ channelId }: { channelId: string }) {
    const getChannel = async (): Promise<IGroupChannel | undefined> => {
        const data = await axios({
            url: `baseurl/${channelId}`,
            method: "GET",
        });
        const resp: returnGroupChannel = data.data;
        return resp.data;
    };

    return useQuery({
        queryKey: [`group-channel-${channelId}`],
        queryFn: getChannel,
    });
}

export { useGetGroupChannelQuery };
