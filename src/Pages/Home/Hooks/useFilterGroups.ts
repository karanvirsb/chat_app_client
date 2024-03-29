import { useEffect, useState } from "react";
import { IGroup } from "../../../Hooks/groupHooks";
import { isGroupArray } from "../../../test/validation/schemaValidation";

type props = {
    groups: IGroup[] | string | undefined;
    groupId: string;
}

export default function useFilterGroups({ groups, groupId }: props): IGroup {
    const [group, setGroup] = useState<IGroup>({
        groupId: "",
        dateCreated: new Date(),
        groupName: "",
        inviteCode: "",
    });

    useEffect(() => {
        if (isGroupArray(groups)) {
            const foundGroup = groups.find(
                (group) => group.groupId === groupId
            );

            if (foundGroup != null) setGroup(() => foundGroup);
        }
    }, [groups, groupId]);

    return group;
}
