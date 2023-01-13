import React, { useRef } from "react";
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
  return (
    <div className="flex flex-col flex-grow overflow-auto bg-chat-bg">
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

      <form className="p-4 input-group" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          placeholder="Send a message"
          className="input input-bordered bg-[#2a303c] w-full focus:outline-none"
          ref={messageRef}
        />
      </form>
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
