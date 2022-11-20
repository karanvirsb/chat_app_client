import { IGroup } from "../../Redux/slices/groupApiSlice";

export function isGroupArray(arr: IGroup[] | string): arr is IGroup[] {
    return (arr as IGroup[]).map !== undefined;
}

export function isGroup(item: IGroup | string | undefined): item is IGroup {
    return (item as IGroup).groupId !== undefined;
}
