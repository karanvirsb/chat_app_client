import React, { useEffect, useRef, useState } from "react";

type props = {
    direction: "dropdown-top" | "dropdown-left" | "dropdown-right";
    align?: "dropdown-end";
    hover?: boolean;
    btnClass?: string;
    listClass?: string;
    btnChildren: JSX.Element | string;
    children?: JSX.Element;
    symbol?: boolean;
};

export default function DropDown({
    direction,
    align,
    hover,
    btnClass,
    listClass,
    btnChildren,
    children,
    symbol,
}: props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleEscPress = (event: KeyboardEvent) => {
            console.log(event.code);
            if (event.code === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress);
    }, []);

    return (
        <div
            className={`dropdown ${direction} ${align} ${
                hover && "dropdown-hover"
            } mt-auto`}
            onClick={() => setOpen(!open)}
        >
            <label
                tabIndex={0}
                className={`${btnClass ? btnClass : "btn btn-circle m-1"}`}
            >
                {btnChildren}
                {/* TODO create symbol */}
                {symbol && ""}
            </label>
            {open && (
                <ul
                    tabIndex={1}
                    className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${listClass}`}
                >
                    {children}
                </ul>
            )}
        </div>
    );
}
