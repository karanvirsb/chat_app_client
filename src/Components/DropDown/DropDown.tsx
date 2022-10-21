import React from "react";

type props = {
    direction: "dropdown-top" | "dropdown-left" | "dropdown-right";
    align?: "dropdown-end";
    hover?: boolean;
    btnClass?: string;
    listClass?: string;
    btnChildren: JSX.Element;
    listChildren: JSX.Element;
};

const DropDown = ({
    direction,
    align,
    hover,
    btnClass,
    listClass,
    btnChildren,
    listChildren,
}: props) => {
    return (
        <div
            className={`dropdown ${direction} ${align} ${
                hover && "dropdown-hover"
            } mt-auto`}
        >
            <label
                tabIndex={0}
                className={`${btnClass ? btnClass : "btn btn-circle m-1"}`}
            >
                {btnChildren}
            </label>
            <ul
                tabIndex={1}
                className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${listClass}`}
            >
                {listChildren}
            </ul>
        </div>
    );
};

export default DropDown;
