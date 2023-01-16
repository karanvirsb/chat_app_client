import { IGroup, IUser } from "../Hooks/groupHooks";

export interface InvalidateEvent {
  queryTags: string[];
  groupId: string;
};

export interface UpdateEvent {
  groupId: string;
  payload: Partial<IGroup>;
};

export interface DeleteEvent {
  groupId: string;
  payload: {};
};

export interface JoinRoomEvent {
  rooms: string[];
  userId: string;
};

export interface UpdateGroupUsersEvent {
  groupId: string;
  payload: { userInfo: IUser };
};

export interface LeaveRoomEvent {
  groupId: string;
  payload: { userId: string };
};

export interface LeaveGroupEvent {
  groupId: string;
  payload: { userId: string };
};
