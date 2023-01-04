import React, { InputHTMLAttributes, useRef } from "react";
import { useGetGroupMessagesByChannelIdQuery } from "../../../Hooks/groupChatHooks";

type props = {
  channelId: string;
};

export default function GroupChat({ channelId }: props) {
  const messageRef = useRef<null | HTMLInputElement>(null);
  // TODO after inital load need to set dateCreated to last message.
  const {
    data: chatMessages,
    isFetching,
    isLoading,
    isError,
  } = useGetGroupMessagesByChannelIdQuery({
    channelId,
    dateCreated: new Date(),
    limit: 10,
  });
  return (
    <div className="bg-chat-bg flex flex-col flex-grow h-full">
      <div className="flex-grow p-4 w-full ">
        {/* TODO Create chat component */}
      </div>

      <form className="input-group p-4" onSubmit={handleMessageSubmit}>
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
    console.log(messageRef.current?.value);
  }
}
