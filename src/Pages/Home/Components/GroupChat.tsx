import React, { useEffect, useRef } from "react";
import {
  useCreateGroupMessageMutation,
  useGetGroupMessagesByChannelIdQuery,
} from "../../../Hooks/groupChatHooks";
import useGetSession from "../../../Hooks/useGetSession";
import Messages from "../../../Components/Messages/Messages";

type props = {
  channelId: string;
  groupId: string;
};

export default function GroupChat({ channelId, groupId }: props) {
  const messageRef = useRef<null | HTMLInputElement>(null);
  const chatMessagesRef = useRef<null | HTMLDivElement>(null);
  // TODO after inital load need to set dateCreated to last message.
  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useGetGroupMessagesByChannelIdQuery({
    channelId,
    dateCreated: new Date(),
    limit: 10,
  });
  const { mutate, isError: createMessageError } =
    useCreateGroupMessageMutation();

  const { sessionInfo } = useGetSession();

  useEffect(() => {
    // scroll height gives height of element
    // client height gives height of actual element or css height
    // so scroll top is the vertical top and max is scrollHeight
    if (chatMessagesRef.current) {
      let isScrolledToBottom =
        chatMessagesRef.current.scrollHeight -
          chatMessagesRef.current.clientHeight <=
        chatMessagesRef.current.scrollTop + 1;

      if (isScrolledToBottom)
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight -
          chatMessagesRef.current.clientHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [channelId]);

  return (
    <div
      className="flex relative flex-col flex-grow overflow-auto bg-chat-bg"
      ref={chatMessagesRef}
    >
      <div className="flex flex-col w-full gap-6 p-4 ">
        {/* TODO Create chat component */}
        {chatMessages
          ? chatMessages?.pages.map((_, index, pages) => {
              return (
                <Messages
                  groupId={groupId}
                  messages={pages[pages.length - 1 - index]?.data}
                ></Messages>
              );
            })
          : null}
        <button onClick={() => fetchNextPage()}>fetch next messages</button>
      </div>
      {channelId ? (
        // made it sticky so it will stay at the bottom
        <form
          className="p-4 input-group sticky bottom-0 bg-chat-bg"
          onSubmit={handleMessageSubmit}
        >
          <input
            type="text"
            placeholder="Send a message"
            className="input input-bordered !rounded-full bg-[#2a303c] w-full focus:outline-none"
            ref={messageRef}
          />
        </form>
      ) : null}
    </div>
  );

  function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageRef.current && sessionInfo)
      mutate({
        channelId,
        dateCreated: new Date(),
        text: messageRef.current.value,
        userId: sessionInfo?.userId,
      });
  }
}
