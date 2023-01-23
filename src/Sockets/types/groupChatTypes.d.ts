import { IMessage } from "../../Hooks/groupChatHooks";

export interface ICreateGroupMessageEvent {
  groupId: string;
  payload: { messageInfo: IMessage };
}

export interface IUpdateGroupMessageEvent {
  groupId: string;
  payload: { messageInfo: IMessage; pageIndex: number; currIndex: number };
}

export interface IDeleteGroupMessageEvent {
  groupId: string;
  payload: {
    messageId: string;
    channelId: string;
    pageIndex: number;
    currIndex: number;
  };
}
