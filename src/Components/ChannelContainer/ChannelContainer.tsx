import React from "react";
import { useAppSelector } from "../../Hooks/reduxHooks";

type props = {
    children: JSX.Element;
};

export default function ChannelContainer({ children }: props) {
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);
    return (
        <div
            className={`flex flex-col flex-grow ${
                isSideBarOpen
                    ? "sm:translate-x-[307.375px]"
                    : "sm:translate-x-[0px]"
            }`}
        >
            {children}
        </div>
    );
}