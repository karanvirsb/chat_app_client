import React, { useEffect } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import MutationModal from "./MutationModal";
import { useDeleteGroupMessageMutation } from "../../Hooks/groupChatHooks";

type props = {
  messageId: string;
};

export default function DeleteMessageModal({ messageId }: props) {
  const dispatch = useAppDispatch();
  const {
    mutate: deleteMessage,
    isLoading,
    isSuccess,
  } = useDeleteGroupMessageMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      handleCancel();
    }
  }, [isLoading, isSuccess]);

  return (
    <MutationModal
      btnCTAName="Yes"
      btnCancelName="No"
      modalName="Delete Message"
      text="Are you sure you want to delete the message?"
      loading={isLoading}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    ></MutationModal>
  );

  function handleCancel() {
    dispatch(resetModal());
  }

  function handleSubmit() {
    deleteMessage({ messageId });
  }
}
