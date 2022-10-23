import React from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import MutationModal from "./MutationModal";

export default function LeaveGroupModal() {
    const dispatch = useAppDispatch();
    return (
        <MutationModal
            btnCTAName='Yes'
            btnCancelName='No'
            modalName='Leave Group'
            text='Are you sure you want to leave the group?'
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        ></MutationModal>
    );

    // TODO handle leaving group
    function handleSubmit() {}

    function handleCancel() {
        dispatch(resetModal());
    }
}
