import React from "react";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import Modal from "./Modal";

type props = {
    handleCancel: () => void;
    handleSubmit: () => void;
    modalName: string;
    btnCTAName: string;
    btnCancelName: string;
    text: string;
};

export default function MutationModal({
    handleCancel,
    handleSubmit,
    modalName,
    btnCTAName,
    btnCancelName,
    text,
}: props) {
    return (
        <Modal modalName={modalName} modalClass='!max-w-[300px]'>
            <div className='flex flex-col flex-grow justify-end mt-6'>
                <label className='label flex gap-4 mr-auto flex-grow'>
                    <span className='label-text text-lg text-white'>
                        {text}
                    </span>
                </label>
                <div className='flex gap-4 mt-2s'>
                    <BtnCallToAction
                        onClick={handleSubmit}
                        text={btnCTAName}
                    ></BtnCallToAction>
                    <BtnCancelAction
                        onClick={handleCancel}
                        text={btnCancelName}
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );
}
