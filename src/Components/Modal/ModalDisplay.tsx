import React, { useEffect } from "react";
import ChangeGroupNameModal from "./ChangeGroupNameModal";
import { useAppSelector } from "../../Hooks/reduxHooks";

export default function ModalDisplay() {
    const modalOpen = useAppSelector((state) => state.modalReducer.open);
    const modalOptions = useAppSelector((state) => state.modalReducer.options);
    const modalName = useAppSelector((state) => state.modalReducer.modalName);

    return (
        <>
            {modalOpen && modalName === "changeGroupName" && (
                <ChangeGroupNameModal></ChangeGroupNameModal>
            )}
        </>
    );
}
