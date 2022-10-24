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
        <Modal modalName='Change Group Name' modalClass='flex'>
            <div className='flex flex-col flex-grow w-full gap-4 mt-6 justify-end'>
                <ModalInput
                    labelName='Group Name'
                    onChange={handleChange}
                    value={groupName}
                    placeholder='Group Name'
                    inputId='groupName'
                    formClass='flex-grow'
                ></ModalInput>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        text='Create'
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
