import React from "react";
import ChangeGroupNameModal from "./ChangeGroupNameModal";

type props = {
    open: boolean;
    options: any;
    modalName: "changeGroupName" | "";
};

export default function ModalDisplay({
    modalName = "",
    open = false,
    options = {},
}: props) {
    return (
        <>
            {modalName === "changeGroupName" && open && (
                <ChangeGroupNameModal></ChangeGroupNameModal>
            )}
        </>
    );
}
