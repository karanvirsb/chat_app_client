import React from "react";
import Modal from "./Modal";

// TODO give group id
export default function ChangeGroupNameModal() {
    return (
        <Modal modalName='Change Group Name'>
            <>
                <div className='form-control w-full max-w-xs'>
                    <label className='label'>
                        <span className='label-text'>Previous Name:</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Type here'
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
                        placeholder='Type here'
                        className='input input-bordered w-full max-w-xs'
                    />
                </div>
                <div>
                    <button className='btn'>Change</button>
                    <button className='btn'>Cancel</button>
                </div>
            </>
        </Modal>
    );
}
