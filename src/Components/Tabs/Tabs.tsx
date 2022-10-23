import React, { useState } from "react";

type props = {
    components: Map<String, JSX.Element>;
    tabs: string[];
};

export default function Tabs({ components, tabs }: props) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <div className='flex w-full'>
                {tabs.map((tab, index) => {
                    if (index === activeIndex) {
                        return (
                            <button
                                className='btn rounded-none border-none border-b-2 border-b-chat-bg'
                                onClick={() => setTab(index)}
                            >
                                {tab}
                            </button>
                        );
                    } else {
                        return (
                            <button
                                className='btn rounded-none border-none'
                                onClick={() => setTab(index)}
                            >
                                {tab}
                            </button>
                        );
                    }
                })}
            </div>
            <article>{components.get(tabs[activeIndex])}</article>
        </>
    );

    function setTab(index: number) {
        setActiveIndex(() => index);
    }
}
