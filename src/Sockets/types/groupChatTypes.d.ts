import { IMessage } from "../../Hooks/groupChatHooks";

export interface ICreateGroupMessageEvent {
  channelId: string;
  payload: { messageInfo: IMessage };
}

export interface IUpdateGroupMessageEvent {
  channelId: string;
  payload: { messageInfo: Partial<IMessage> };
}

export interface IDeleteGroupMessageEvent {
  channelId: string;
  payload: { messageId: string };
}
