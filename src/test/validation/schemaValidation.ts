import { IGroup } from "../../Redux/slices/groupApiSlice";

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
