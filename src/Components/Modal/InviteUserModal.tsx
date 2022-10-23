import React, { useState } from "react";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

export default function InviteUserModal() {
    const [usernameSearch, setUsernameSearch] = useState("");

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
}
