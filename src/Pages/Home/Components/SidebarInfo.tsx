import React from "react";
import { useAppSelector } from "../../../Hooks/reduxHooks";

type props = {
    children: JSX.Element;
};

export default function SidebarInfo({ children }: props) {
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);

    return (
        <div
            className={`flex flex-col min-w-[250px] sm:fixed sm:top-0 sm:left-[72px] sm:bottom-0 sm:z-[5] sm:${
                isSideBarOpen ? "translate-x-0" : "-translate-x-[100%]"
            } `}
        >
            {children}
        </div>
    );
}
