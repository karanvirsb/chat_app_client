import React from "react";

type props = {
    labelClass?: string;
    inputClass?: string;
    formClass?: string;
    labelName: string;
    inputId: string;
    editable?: boolean;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    value?: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function ModalInput({
    labelClass = "",
    inputClass = "",
    formClass = "",
    labelName = "",
    inputId = "",
    editable = true,
    placeholder = "Type Here",
    type = "",
    value,
    onChange,
}: props) {
    return (
        <div className={`form-control w-full ${formClass}`}>
            <label className={`label ${labelClass}`} htmlFor={inputId}>
                <span className={`label-text text-white ${labelClass}`}>
                    {labelName}
                </span>
            </label>
            <input
                id={inputId}
                type={type}
                placeholder={placeholder}
                className={`input input-bordered bg-[#2A303C] w-full ${inputClass}`}
                contentEditable={editable}
                onChange={onChange ?? undefined}
                value={value}
            />
        </div>
    );
}
