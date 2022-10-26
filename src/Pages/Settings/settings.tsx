import React, { useState } from "react";
import AccountTab from "./Components/AccountTab";
import Sidebar from "./Components/Sidebar";

const settings = () => {
    const tabs = ["Accounts"];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='flex'>
            <Sidebar
                tabs={tabs}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            ></Sidebar>
            {activeIndex === 0 && <AccountTab></AccountTab>}
        </div>
    );
};

export default settings;
