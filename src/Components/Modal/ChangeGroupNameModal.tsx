import React, { useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import Modal from "./Modal";

// TODO give group id
export default function ChangeGroupNameModal() {
    const [newName, setNewName] = useState<string>("");
    const dispatch = useAppDispatch();

    return (
        <Modal modalName='Change Group Name'>
            <div className='flex flex-col gap-4 mt-6'>
                <div className='form-control w-full'>
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
                </div>
                <div className='form-control w-full'>
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
                </div>
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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(() => e.target.value);
    }

    function closeModal() {
        dispatch(resetModal());
    }

    // api slice
    function handleSubmit() {}
}
