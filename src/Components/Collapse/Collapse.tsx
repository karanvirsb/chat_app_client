import React, { MouseEventHandler, useState } from "react";

type props = {
  children: any;
  title: string;
  clickEvent?: MouseEventHandler<HTMLElement>;
};

const Collapse = ({ children, title, clickEvent }: props) => {
  const [clicked, setClicked] = useState(false);
  return (
    // TODO add transition time
    <>
      <div className="flex flex-col items-start px-2">
        <p className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 w-full py-4">
          <span
            className="text-md flex items-center justify-self-end self-start"
            onClick={() => {
              setClicked((prev) => !prev);
            }}
          >
            {clicked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </span>
          <div className="justify-self-start self-start flex flex-col">
            <p
              onClick={() => {
                setClicked((prev) => !prev);
              }}
            >
              {title}
            </p>
            {clicked && children}
          </div>
          {/* TODO hover color */}
          {clickEvent != null ? (
            <span
              className="text-2xl font-light cursor-pointer justify-self-center self-start"
              onClick={clickEvent}
            >
              +
            </span>
          ) : null}
        </p>
      </div>
    </>
  );
};

export default Collapse;
