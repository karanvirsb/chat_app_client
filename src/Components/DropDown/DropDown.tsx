import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useComponentVisible from "../../Hooks/useComponentVisible";

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

// TODO bug when clicking off component it should be off
export default function DropDown({
    direction,
    align,
    hover,
    btnClass = "",
    listClass = "",
    btnChildren,
    children,
    symbol,
}: props) {
    const [clicked, setClicked] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible();

    useEffect(() => {
        const handleEscPress = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                setIsComponentVisible(false);
                setClicked(false);
            }
        };

        document.addEventListener("keydown", handleEscPress);
        return () => document.removeEventListener("keydown", handleEscPress);
    }, []);

    useEffect(() => {
        if (!isComponentVisible) {
            setClicked(false);
        }
    }, [isComponentVisible]);

    return (
        <div
            className={`dropdown ${direction} ${align} ${
                hover && "dropdown-hover"
            } mt-auto`}
        >
            <label
                tabIndex={0}
                className={`${btnClass ? btnClass : "btn btn-circle m-1"}`}
                onClick={toggleMenu}
            >
                {btnChildren}
                {/* TODO create symbol */}
                {symbol && ""}
            </label>

            {isComponentVisible && (
                <ul
                    tabIndex={1}
                    className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${listClass}`}
                    ref={ref}
                >
                    {children}
                </ul>
            )}
        </div>
    );

    function toggleMenu() {
        if (!clicked) {
            setClicked(true);
            setIsComponentVisible(true);
        } else {
            setClicked(false);
        }
    }
}
