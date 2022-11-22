import React from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import {
    useGetGroupByInviteCodeQuery,
    useGetGroupUsersQuery,
} from "../../Redux/slices/groupApiSlice";
import { resetModal } from "../../Redux/slices/modalSlice";
import { isGroup } from "../../test/validation/schemaValidation";
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
    const dispatch = useAppDispatch();
    const { data: group } = useGetGroupByInviteCodeQuery(inviteCode);
    const { data: groupUsers, isLoading: areUsersLoading } =
        useGetGroupUsersQuery(isGroup(group) ? group.groupId : "", {
            skip: group ? false : true,
        });

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
