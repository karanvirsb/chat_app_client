import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import {
    useGetGroupByInviteCodeQuery,
    useGetGroupUsersQuery,
} from "../../Redux/slices/groupApiSlice";
import { resetModal } from "../../Redux/slices/modalSlice";
import { areGroupUsers, isGroup } from "../../test/validation/schemaValidation";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import Modal from "./Modal";

type props = {
    inviteCode: string;
};

// TODO have invite code as a parameter
// TODO get group and members
// TODO display are you sure you want to join [groupName] and then how many members are online and offline
export default function JoinGroupModal({ inviteCode }: props) {
    const [skipGroupUsers, setSkipGroupUsers] = useState(true);
    const dispatch = useAppDispatch();
    const { data: group, isSuccess } = useGetGroupByInviteCodeQuery(inviteCode);
    const { data: groupUsers, isLoading: areUsersLoading } =
        useGetGroupUsersQuery(isGroup(group) ? group.groupId : "", {
            skip: skipGroupUsers,
        });

    useEffect(() => {
        if (isSuccess && isGroup(group)) {
            setSkipGroupUsers(false);
        }
    }, [group]);

    // if group is an error
    if (!isGroup(group))
        return (
            <Modal modalName='Join A Group' modalClass='flex'>
                <>
                    <div>
                        <p>Error: {group}</p>
                    </div>
                    <div className='flex gap-4 mt-2'>
                        <BtnCancelAction
                            text='Ok'
                            onClick={closeModal}
                        ></BtnCancelAction>
                    </div>
                </>
            </Modal>
        );

    // if users are errored
    if (!areGroupUsers(groupUsers)) {
        <Modal modalName='Join A Group' modalClass='flex'>
            <>
                <div>
                    <p>Error: {groupUsers}</p>
                </div>
                <div className='flex gap-4 mt-2'>
                    <BtnCancelAction
                        text='Ok'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </>
        </Modal>;
    }

    return (
        <Modal modalName='Join A Group' modalClass='flex'>
            <>
                <div>
                    <p>Are you sure you want to join [groupName]</p>
                    <div>Online Members Offline members</div>
                </div>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        text='Join'
                        onClick={handleSubmit}
                    ></BtnCallToAction>
                    <BtnCancelAction
                        text='Cancel'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </>
        </Modal>
    );

    function closeModal() {
        dispatch(resetModal());
    }
    function handleSubmit() {}
}
