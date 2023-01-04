import axios from "../API/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import useGroupChannelSockets from "../Sockets/Hooks/useGroupChannelSockets";

// setting up global variables
const baseurl = "http://localhost:8000/groupChannel";

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

export type returnGroupChannels = {
  success: boolean;
  data: IGroupChannel[] | undefined;
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

  return useInfiniteQuery({
    queryKey: [`group-channel-${channelId}`],
    queryFn: getChannel,
  });
}

function useGetGroupChannelsQuery({ groupId }: { groupId: string }) {
  const getChannels = async (): Promise<IGroupChannel[]> => {
    const data = await axios({
      url: `${baseurl}/all/${groupId}`,
      method: "GET",
    });
    const resp: returnGroupChannels = data.data;
    return resp.data ?? [];
  };

  return useQuery({
    queryKey: [`group-channels-${groupId}`],
    queryFn: getChannels,
    enabled: groupId !== undefined || groupId !== "",
  });
}

// Mutations

function useCreateGroupChannelMutation() {
  const queryClient = useQueryClient();
  const send = useGroupChannelSockets();
  const createGroupChannel = async ({
    channelName,
    groupId,
  }: {
    channelName: string;
    groupId: string;
  }): Promise<returnGroupChannel> => {
    const resp = await axios({
      url: `${baseurl}`,
      method: "POST",
      data: {
        channelInfo: {
          groupId,
          channelName,
        },
      },
    });
    const result: returnGroupChannel = resp.data;

    return result;
  };

  return useMutation({
    mutationFn: createGroupChannel,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([`group-channels-${data.data?.groupId}`]);
      if (data.data) {
        send("update_channel_lists", {
          groupId: data.data.groupId,
          payload: { channelInfo: data.data },
        });
      }
    },
  });
}

export {
  useGetGroupChannelQuery,
  useGetGroupChannelsQuery,
  useCreateGroupChannelMutation,
};
