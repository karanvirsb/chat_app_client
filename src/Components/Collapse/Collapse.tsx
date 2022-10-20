import React, { MouseEventHandler, useState } from "react";

type props = {
    children: any;
    title: string;
    clickEvent?: MouseEventHandler<HTMLElement>;
};

const Collapse = ({ children, title, clickEvent }: props) => {
    const [clicked, setClicked] = useState(false);
    return (
        // TODO Fix tab with preline
        <>
            <div className='flex items-center px-4'>
                <div
                    className='collapse-title text-xl font-medium flex gap-4'
                    onClick={() => setClicked((prev) => !prev)}
                >
                    {clicked ? (
                        <div className='-rotate-90'>&#10094;</div>
                    ) : (
                        <div className=''>&#10095;</div>
                    )}
                    <span>{title}</span>
                </div>
                {clickEvent && (
                    <span
                        className='cursor-pointer text-xl'
                        onClick={clickEvent}
                    >
                        +
                    </span>
                )}
            </div>
            {clicked && children}
        </>
    );
};

export default Collapse;
