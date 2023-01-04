import axios from "../API/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

export interface IMessage {
  userId: string;
  dateCreated: Date;
  messageId: string;
  dateModified?: Date;
  replyTo?: string;
  text: string;
  channelId: string;
}

interface ReturnGroupChannels {
  success: boolean;
  data: IMessage[] | undefined;
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
  const getMessages = async (): Promise<IMessage[] | undefined> => {
    const resp = await axios({
      url: `${baseurl}/channel`,
      params: { channelId, dateCreated, limit },
      method: "GET",
    });
    const data: ReturnGroupChannels = resp.data;
    return data.data;
  };

  return useInfiniteQuery({
    queryKey: [`group-messages-${channelId}`],
    queryFn: getMessages,
    enabled: !!channelId,
  });
}

export { useGetGroupMessagesByChannelIdQuery };
