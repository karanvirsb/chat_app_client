import React, { useState } from "react";
import { useAppSelector } from "../../Hooks/reduxHooks";
import AccountTab from "./Components/AccountTab";
import Sidebar from "./Components/Sidebar";

const tabs = ["Accounts"];
const settings = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isSideBarOpen = useAppSelector((state) => state.SideBarReducer.open);

    return (
        <div className='flex flex-grow w-full '>
            <Sidebar
                tabs={tabs}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            ></Sidebar>
            <div
                className={`w-full ${
                    isSideBarOpen
                        ? "md:translate-x-[250px]"
                        : "md:translate-x-0"
                }`}
            >
                {activeIndex === 0 && <AccountTab></AccountTab>}
            </div>
        </div>
    );
};

export default settings;
