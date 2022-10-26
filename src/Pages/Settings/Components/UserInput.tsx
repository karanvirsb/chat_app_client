import React from "react";

type props = {
    labelName: string;
    value: string;
    onClick: (...args: any) => any | void;
};

export default function UserInput({ labelName, value, onClick }: props) {
    return (
        <div className='form-control w-[70%]'>
            <label className='label'>
                <span className='label-text'>{labelName}</span>
            </label>
            <div className='flex gap-4 w-full'>
                <input
                    type='text'
                    className='input input-bordered w-full'
                    contentEditable={false}
                    value={value}
                />
                <button className='btn' onClick={onClick}>
                    Edit
                </button>
            </div>
        </div>
    );
}
