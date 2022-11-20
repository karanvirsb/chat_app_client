import React, { useEffect } from "react";
import ChangeGroupNameModal from "./ChangeGroupNameModal";
import { useAppSelector } from "../../Hooks/reduxHooks";
import InviteUserModal from "./InviteUserModal";
import MutationModal from "./MutationModal";
import DeleteGroupModal from "./DeleteGroupModal";
import LeaveGroupModal from "./LeaveGroupModal";
import CreateGroupModal from "./CreateGroupModal";
import AddFriendModal from "./AddFriendModal";
import DeleteAccountModal from "./DeleteAccountModal";
import EditUsernameModal from "./EditUsernameModal";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";

export default function ModalDisplay() {
    const modalOpen = useAppSelector((state) => state.modalReducer.open);
    const modalOptions = useAppSelector((state) => state.modalReducer.options);
    const modalName = useAppSelector((state) => state.modalReducer.modalName);

    return (
        <>
            {modalOpen && modalName === "changeGroupName" && (
                <ChangeGroupNameModal
                    groupId={modalOptions.groupId}
                    previousName={modalOptions.previousName}
                ></ChangeGroupNameModal>
            )}

            {modalOpen && modalName === "inviteUser" && (
                <InviteUserModal
                    inviteCode={modalOptions.inviteCode}
                ></InviteUserModal>
            )}

            {modalOpen && modalName === "deleteGroup" && (
                <DeleteGroupModal
                    groupId={modalOptions.groupId}
                ></DeleteGroupModal>
            )}

            {modalOpen && modalName === "leaveGroup" && (
                <LeaveGroupModal></LeaveGroupModal>
            )}

            {modalOpen && modalName === "createGroup" && (
                <CreateGroupModal></CreateGroupModal>
            )}

            {modalOpen && modalName === "addFriend" && (
                <AddFriendModal></AddFriendModal>
            )}

            {modalOpen && modalName === "deleteAccount" && (
                <DeleteAccountModal></DeleteAccountModal>
            )}

            {modalOpen && modalName === "editUsername" && (
                <EditUsernameModal></EditUsernameModal>
            )}

            {modalOpen && modalName === "editEmail" && (
                <EditEmailModal></EditEmailModal>
            )}

            {modalOpen && modalName === "editPassword" && (
                <EditPasswordModal></EditPasswordModal>
            )}
        </>
    );
}
