import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import { resetModal } from "../../Redux/slices/modalSlice";
import Modal from "./Modal";

// TODO give group id
export default function ChangeGroupNameModal() {
    const [newName, setNewName] = useState<string>("");
    const dispatch = useAppDispatch();

    return (
        <Modal modalName='Change Group Name'>
            <>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Previous Name:</span>
                    </label>
                    <input
                        type='text'
                        placeholder=''
                        className='input input-bordered w-full max-w-xs'
                        contentEditable={false}
                    />
                </div>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'>
                        <span className='label-text'>New Name:</span>
                    </label>
                    <input
                        type='text'
                        placeholder='New group name'
                        className='input input-bordered w-full max-w-xs'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='btn' onClick={handleSubmit}>
                        Change
                    </button>
                    <button className='btn' onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </>
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
