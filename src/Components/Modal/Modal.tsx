import React from "react";

type props = {
    children: JSX.Element;
    bgClass?: string;
    modalClass?: string;
};
// TODO create modal with children, name
const Modal = ({ children, bgClass = "", modalClass = "" }: props) => {
    return (
        <div className={`modal modal-bottom sm:modal-middle ${bgClass}`}>
            <div className={`modal-box ${modalClass}`}>{children}</div>
        </div>
    );
};

export default Modal;
