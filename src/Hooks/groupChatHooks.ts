import axios from "../API/axios";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseMutationResult,
  InfiniteData,
} from "@tanstack/react-query";
import { PaginatedGroupMessages } from "../utilities/types/pagination";
import useGroupChatSockets from "../Sockets/Hooks/useGroupChatSockets";

export type IMessage = {
  userId: string;
  dateCreated: Date;
  messageId: string;
  dateModified?: Date;
  replyTo?: string;
  text: string;
  channelId: string;
};

type ReturnGroupMessages = {
  success: boolean;
  data: PaginatedGroupMessages<IMessage> | undefined;
  error: string;
};

type ReturnGroupMessage = {
  success: boolean;
  data: IMessage | undefined;
  error: string;
};

// setting up global variables
const baseurl = "http://localhost:8000/groupMessage";

type IUserGetGroupMessagesByChannelIdQuery = UseInfiniteQueryResult<
  PaginatedGroupMessages<IMessage> | undefined,
  unknown
>;

function useGetGroupMessagesByChannelIdQuery({
  channelId,
  dateCreated,
  limit,
}: {
  channelId: string;
  dateCreated: Date;
  limit: number;
}): IUserGetGroupMessagesByChannelIdQuery {
  const getMessages = async ({
    pageParam = `${baseurl}/channel/messages?channelId=${channelId}&limit=${limit}&dateCreated=${dateCreated.toISOString()}`,
  }): Promise<PaginatedGroupMessages<IMessage> | undefined> => {
    if (pageParam === null || pageParam.length === 0) return undefined;
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
    enabled: channelId.length > 0 && dateCreated.getDate() !== null,
    getNextPageParam: (last, page) => last?.nextPage,
  });
}

// MUTATIONS
type IUseCreateGroupMessageMutation = UseMutationResult<
  ReturnGroupMessage,
  unknown,
  {
    channelId: string;
    dateCreated: Date;
    text: string;
    userId: string;
  },
  unknown
>;
function useCreateGroupMessageMutation(): IUseCreateGroupMessageMutation {
  const send = useGroupChatSockets();
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
  }): Promise<ReturnGroupMessage> => {
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
      if (data.data === undefined) return;

      send({
        event: "create_group_message",
        data: {
          channelId: data.data.channelId,
          payload: { messageInfo: data.data },
        },
      });
    },
  });
}

type IUseEditMessageTextMutation = UseMutationResult<
  ReturnGroupMessage,
  unknown,
  {
    messageId: string;
    updateValue: string;
  },
  unknown
>;
function useEditMessageTextMutation(): IUseEditMessageTextMutation {
  const send = useGroupChatSockets();

  const updateMessage = async ({
    messageId,
    updateValue,
  }: {
    messageId: string;
    updateValue: string;
  }): Promise<ReturnGroupMessage> => {
    const resp = await axios({
      url: `${baseurl}/text`,
      data: { messageId, updateValue },
      method: "PUT",
    });
    const data: ReturnGroupMessage = resp.data;
    return data;
  };

  return useMutation({
    mutationFn: updateMessage,
    onSuccess: async (data) => {
      // TODO add socket functionality;
      if (data.data === undefined) return;

      send({
        event: "update_group_message",
        data: {
          channelId: data.data.channelId,
          payload: { messageInfo: data.data },
        },
      });
    },
  });
}

type IUseDeleteGroupMessageMutation = UseMutationResult<
  ReturnGroupMessage,
  unknown,
  {
    messageId: string;
  },
  unknown
>;

function useDeleteGroupMessageMutation(): IUseDeleteGroupMessageMutation {
  const queryClient = useQueryClient();
  const deleteMessage = async ({
    messageId,
  }: {
    messageId: string;
  }): Promise<ReturnGroupMessage> => {
    const resp = await axios({
      url: baseurl,
      method: "DELETE",
      data: { messageId },
    });

    const data: ReturnGroupMessage = resp.data;
    return data;
  };

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: async (data) => {
      if (data.data === undefined) return;
      queryClient.setQueryData(
        [`group-messages-${data.data.channelId}`],
        (oldData: unknown) => {
          const deleteResult = (
            infiniteData: InfiniteData<PaginatedGroupMessages<IMessage>>
          ) => {
            if (data.data !== undefined) {
              const filteredData: IMessage[][] = infiniteData.pages.map(
                (page) =>
                  page.data.filter(
                    (message) => message.messageId !== data.data?.messageId
                  )
              );
              const newData: {
                data: IMessage[];
              }[] = filteredData.map((message) => {
                return {
                  data: message,
                };
              });

              return { ...infiniteData, pages: [...newData] };
            }
          };

          return checkIfPagesExist(oldData) ? deleteResult(oldData) : oldData;
        }
      );
    },
  });
}

export {
  useGetGroupMessagesByChannelIdQuery,
  useCreateGroupMessageMutation,
  useEditMessageTextMutation,
  useDeleteGroupMessageMutation,
};
