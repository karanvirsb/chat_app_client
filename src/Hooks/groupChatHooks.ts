import axios from "../API/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { PaginatedGroupMessages } from "../utilities/types/pagination";

export interface IMessage {
  userId: string;
  dateCreated: Date;
  messageId: string;
  dateModified?: Date;
  replyTo?: string;
  text: string;
  channelId: string;
}

interface ReturnGroupMessages {
  success: boolean;
  data: PaginatedGroupMessages<IMessage> | undefined;
  error: string;
}

interface ReturnGroupMessage {
  success: boolean;
  data: IMessage | undefined;
  error: string;
}

// setting up global variables
const baseurl = "http://localhost:8000/groupMessage";

function useGetGroupMessagesByChannelIdQuery({
  channelId,
  dateCreated,
  limit,
}: {
  channelId: string;
  dateCreated: Date;
  limit: number;
}) {
  const getMessages = async ({
    pageParam = `${baseurl}/channel/messages?channelId=${channelId}&limit=${limit}&dateCreated=${dateCreated.toISOString()}`,
  }): Promise<PaginatedGroupMessages<IMessage> | undefined> => {
    if (pageParam.length === 0) return undefined;
    const resp = await axios({
      url: pageParam,
      method: "GET",
    });

    const data: ReturnGroupMessages = resp.data;
    return data.data;
  };

  return useInfiniteQuery({
    queryKey: [`group-messages-${channelId}`],
    queryFn: getMessages,
    enabled: !!channelId && !!dateCreated,
    getNextPageParam: (last, page) => last?.nextPage,
  });
}

// MUTATIONS

function useCreateGroupMessageMutation() {
  const queryClient = useQueryClient();
  const createMessage = async ({
    channelId,
    dateCreated,
    text,
    userId,
  }: {
    channelId: string;
    dateCreated: Date;
    text: string;
    userId: string;
  }) => {
    const resp = await axios({
      url: `${baseurl}`,
      method: "POST",
      data: { messageInfo: { channelId, dateCreated, userId, text } },
    });

    const data: ReturnGroupMessage = resp.data;

    return data;
  };

  return useMutation({
    mutationFn: createMessage,
    onSuccess: async (data) => {
      queryClient.invalidateQueries([`group-messages-${data.data?.channelId}`]);
      //  if (data.data) {
      //    send("update_channel_lists", {
      //      groupId: data.data.groupId,
      //      payload: { channelInfo: data.data },
      //    });
      //  }
    },
  });
}

export { useGetGroupMessagesByChannelIdQuery, useCreateGroupMessageMutation };
