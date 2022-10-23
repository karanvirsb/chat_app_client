import React, { useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

export default function InviteUserModal() {
    const [usernameSearch, setUsernameSearch] = useState("");
    const dispatch = useAppDispatch();
    // TODO useEffect that checks user name in database

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
                <ModalInput
                    inputId='inviteUserSearch'
                    labelName='Invite User'
                    type='search'
                    placeholder='Search User'
                    value=''
                    onChange={handleUserSearch}
                    errorMsg=''
                ></ModalInput>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        onClick={handleSubmit}
                        text='Send'
                    ></BtnCallToAction>
                    <BtnCancelAction
                        onClick={handleCancel}
                        text='Cancel'
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );

    function handleCopyInviteCode() {
        const text = "copied code"; // TODO replace with invite code url
        navigator.clipboard.writeText(text);
    }

    function handleUserSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setUsernameSearch(() => e.target.value);
    }

    function handleSubmit() {}

    function handleCancel() {
        dispatch(resetModal());
    }
}
