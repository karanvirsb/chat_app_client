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
        <div className={`modal modal-bottom sm:modal-middle ${bgClass}`}>
            <div className={`modal-box relative ${modalClass}`}>
                <div className='absolute top-[2px] left-[10px]'>
                    {modalName}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
