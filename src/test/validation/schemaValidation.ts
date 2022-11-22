import { IGroup, IGroupUser } from "../../Redux/slices/groupApiSlice";

export function isGroupArray(
    arr: IGroup[] | string | undefined
): arr is IGroup[] {
    if (arr === undefined) return false;
    return (arr as IGroup[]).map !== undefined;
}

export function isGroup(item: IGroup | string | undefined): item is IGroup {
    if (item === undefined) return false;
    return (item as IGroup).groupId !== undefined;
}

export function isGroupUser(
    item: IGroupUser | string | undefined
): item is IGroupUser {
    if (item === undefined) return false;
    return (item as IGroupUser).gId !== undefined;
}
