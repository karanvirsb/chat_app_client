import React from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import MutationModal from "./MutationModal";

export default function DeleteGroupModal() {
    const dispatch = useAppDispatch();
    return (
        <MutationModal
            btnCTAName='Yes'
            btnCancelName='No'
            modalName='Delete Group'
            text='Are you sure you want to delete the group?'
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        ></MutationModal>
    );

    // TODO handle deleting group
    function handleSubmit() {}

    function handleCancel() {
        dispatch(resetModal());
    }
}
