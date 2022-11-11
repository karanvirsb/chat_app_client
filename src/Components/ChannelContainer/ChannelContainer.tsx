import React from "react";
import { useAppSelector } from "../../Hooks/reduxHooks";

type props = {
    children: JSX.Element;
};

export default function ChannelContainer({ children }: props) {
    const isSideBarOpen = useAppSelector((state) => state.sideBarReducer.open);
    return (
        <div
            className={`flex flex-col flex-grow ${
                isSideBarOpen
                    ? "md:translate-x-[20.125rem]"
                    : "md:translate-x-[0px]"
            }`}
        >
            {children}
        </div>
    );
}
