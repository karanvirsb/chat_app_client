import React from "react";

type props = {
    text: string;
    onClick: (...args: any) => any;
    classname?: string;
    isLoading?: boolean;
};

export default function BtnCallToAction({
    text,
    onClick,
    classname,
    isLoading,
}: props) {
    return (
        <button
            className={`btn bg-btn-cta  border-none font-bold tracking-wider hover:bg-btn-cta-hover text-white ${classname}`}
            onClick={onClick}
        >
            // TODO add spinner
            {isLoading ? "Loading" : text}
        </button>
    );
}
