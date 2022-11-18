import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { useUpdateGroupNameMutation } from "../../Redux/slices/groupApiSlice";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import ModalInput from "../Inputs/ModalInput";
import Modal from "./Modal";

type props = {
    groupId: string;
};

// TODO give group id
export default function ChangeGroupNameModal({ groupId }: props) {
    const [newName, setNewName] = useState<string>("");
    const [errMsg, setErrMsg] = useState("");
    const [updateGroupName, { isLoading, isSuccess }] =
        useUpdateGroupNameMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            closeModal();
            setNewName("");
            setErrMsg("");
        }
    }, [isLoading, isSuccess]);

    return (
        <Modal modalName='Change Group Name'>
            <div className='flex flex-col gap-4 mt-6'>
                <ModalInput
                    labelName='Previous Name'
                    editable={false}
                    value={""}
                    inputId='prevName'
                ></ModalInput>
                <ModalInput
                    labelName='New Name'
                    onChange={handleChange}
                    value={newName}
                    placeholder='New Group Name'
                    inputId='newName'
                    errorMsg={errMsg}
                ></ModalInput>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        text='Change'
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    ></BtnCallToAction>
                    <BtnCancelAction
                        text='Cancel'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(() => e.target.value);

        if (e.target.value.length > 0) {
            setErrMsg("");
        } else {
            setErrMsg("Group name must be provided.");
        }
    }

    function closeModal() {
        dispatch(resetModal());
    }

    // api slice
    function handleSubmit() {
        if (!newName) setErrMsg("Group name must be provided.");

        if (!isLoading) {
            try {
                updateGroupName({ groupId, newName });
            } catch (error) {
                console.log(error);
            }
        }
    }
}

{
    /* <div className='form-control w-full'>
                        <label className='label' htmlFor='prevName'>
                            <span className='label-text text-white'>
                                Previous Name
                            </span>
                        </label>
                        <input
                            id='prevName'
                            type='text'
                            placeholder=''
                            className='input input-bordered bg-[#2A303C] w-full'
                            contentEditable={false}
                        />
                    </div> */
}
{
    /* <div className='form-control w-full'>
                    <label className='label' htmlFor='newName'>
                        <span className='label-text text-white'>New Name</span>
                    </label>
                    <input
                        id='newName'
                        type='text'
                        placeholder='New group name'
                        className='input input-bordered bg-[#2A303C] w-full'
                        onChange={handleChange}
                    />
                </div> */
}
