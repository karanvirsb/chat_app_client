import React, { useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

export default function EditEmailModal() {
    const [errorMsg, setErrorMsg] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currPassword, setCurrPassword] = useState("");

    const dispatch = useAppDispatch();

    return (
        <Modal modalName='Change Email'>
            <div className='flex flex-col gap-4 mt-6'>
                <ModalInput
                    inputId='currPassword'
                    labelName='Current Password'
                    errorMsg={errorMsg}
                ></ModalInput>
                <ModalInput
                    inputId='email'
                    labelName='New Email'
                    errorMsg={errorMsg}
                ></ModalInput>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        onClick={handleSubmit}
                        text='Change'
                    ></BtnCallToAction>
                    <BtnCancelAction
                        onClick={handleCancel}
                        text='Cancel'
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );

    function handleSubmit() {}

    function handleCancel() {
        dispatch(resetModal());
    }
}
