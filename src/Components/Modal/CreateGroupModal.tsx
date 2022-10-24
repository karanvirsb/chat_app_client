import React, { useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

// TODO
export default function CreateGroupModal() {
    const [groupName, setGroupName] = useState("");
    const dispatch = useAppDispatch();
    return (
        <Modal modalName='Change Group Name'>
            <div className='flex flex-col gap-4 mt-6'>
                <ModalInput
                    labelName='New Name'
                    onChange={handleChange}
                    value={groupName}
                    placeholder='Group Name'
                    inputId='groupName'
                ></ModalInput>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        text='Change'
                        onClick={handleSubmit}
                    ></BtnCallToAction>
                    <BtnCancelAction
                        text='Cancel'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );

    function closeModal() {
        dispatch(resetModal());
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {}

    function handleSubmit() {}
}
