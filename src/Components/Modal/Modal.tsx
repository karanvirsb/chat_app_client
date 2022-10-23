import React from "react";

type props = {
    children: JSX.Element;
    bgClass?: string;
    modalClass?: string;
    modalName?: string;
};
// TODO create modal with children, name
const Modal = ({
    children,
    bgClass = "",
    modalClass = "",
    modalName = "",
}: props) => {
    return (
        <div
            className={`modal modal-bottom sm:modal-middle ${bgClass} visible opacity-100 z-50 pointer-events-auto`}
        >
            <div
                className={`modal-box bg-[#343C4B] relative lg:max-w-[650px] lg:min-h-[300px] xl:max-w-[700px] xl:min-h-[350px] ${modalClass} visible opacity-100 z-50`}
            >
                <div className='absolute top-[2px] left-[10px]'>
                    {modalName}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
