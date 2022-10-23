import React from "react";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

export default function InviteUserModal() {
    return (
        <Modal modalName='Invite User'>
            <div className='flex flex-col gap-4 mt-6'>
                {/* TODO add invite url */}
                <ModalInput
                    inputId='inviteCode'
                    labelName='Invite Code'
                    editable={false}
                    placeholder=''
                    value=''
                >
                    <BtnCallToAction
                        text='Copy'
                        onClick={handleCopyInviteCode}
                    ></BtnCallToAction>
                </ModalInput>
            </div>
        </Modal>
    );

    function handleCopyInviteCode() {
        const text = "copied code"; // TODO replace with invite code url
        navigator.clipboard.writeText(text);
    }
}
