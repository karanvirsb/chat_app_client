import { IGroupChannel } from "../../Hooks/groupChannelHooks";

export interface UpdateChannelsListEvent {
  groupId: string;
  payload: { channelInfo: IGroupChannel };
}
