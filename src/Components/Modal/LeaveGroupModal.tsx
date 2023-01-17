import React, { useEffect } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import useGetSession from "../../Hooks/useGetSession";
import { useLeaveGroupMutation } from "../../Hooks/groupHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import MutationModal from "./MutationModal";

type props = {
    groupId: string;
};

export default function LeaveGroupModal({ groupId }: props) {
    const dispatch = useAppDispatch();
    const { sessionInfo } = useGetSession();
    const {
        mutate: removeUserFromGroup,
        isLoading,
        isSuccess,
    } = useLeaveGroupMutation();

    useEffect(() => {
        if (!isLoading && isSuccess) handleCancel();
    }, [isLoading, isSuccess]);
    return (
        <MutationModal
            btnCTAName='Yes'
            btnCancelName='No'
            modalName='Leave Group'
            text='Are you sure you want to leave the group?'
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={isLoading}
        ></MutationModal>
    );

    // TODO handle leaving group
    function handleSubmit() {
        if (sessionInfo != null) {
            removeUserFromGroup({ userId: sessionInfo.userId, groupId });
        }
    }

    function handleCancel() {
        dispatch(resetModal());
    }
}
