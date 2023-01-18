import React, { useEffect } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import MutationModal from "./MutationModal";

type props = {
  deleteMessageCallback: () => void;
  isLoading: boolean;
  isSuccess: boolean;
};

export default function DeleteMessageModal({
  deleteMessageCallback,
  isLoading,
  isSuccess,
}: props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(isLoading, isSuccess);
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
      handleSubmit={deleteMessageCallback}
    ></MutationModal>
  );

  function handleCancel() {
    dispatch(resetModal());
  }
}
