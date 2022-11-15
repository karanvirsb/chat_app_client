import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import useGetSession from "../../Hooks/useGetSession";
import { useCreateGroupMutation } from "../../Redux/slices/groupApiSlice";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

// TODO
export default function CreateGroupModal() {
    const [groupName, setGroupName] = useState("");
    const [errorMsg, setErrorMessage] = useState("");
    const dispatch = useAppDispatch();
    const { sessionInfo } = useGetSession();
    const [createGroup, { isLoading, isSuccess }] = useCreateGroupMutation();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            closeModal();
            setGroupName("");
            setErrorMessage("");
        }
    }, [isLoading, isSuccess]);

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
                    errorMsg={errorMsg}
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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setGroupName(() => e.target.value);
        if (e.target.value.length > 0) {
            setErrorMessage("");
        }
    }

    function handleSubmit() {
        if (!groupName) setErrorMessage("Group name must be provided.");
        if (!isLoading) {
            try {
                createGroup({
                    groupInfo: { groupName: groupName },
                    userId: sessionInfo ? sessionInfo?.userId : "",
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
}
