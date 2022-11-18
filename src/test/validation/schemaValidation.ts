import { IGroup } from "../../Redux/slices/groupApiSlice";

export function isGroupArray(arr: IGroup[] | string): arr is IGroup[] {
    return (arr as IGroup[]).map !== undefined;
}
