import { IMessage } from "../../Hooks/groupChatHooks";

export interface ICreateGroupMessageEvent {
  groupId: string;
  payload: { messageInfo: IMessage };
}

export interface IUpdateGroupMessageEvent {
  groupId: string;
  payload: { messageInfo: Partial<IMessage> };
}

export interface IDeleteGroupMessageEvent {
  groupId: string;
  payload: { messageId: string; channelId: string };
}
