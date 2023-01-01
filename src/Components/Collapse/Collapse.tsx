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
      <div className="flex flex-col items-start px-4">
        <p className="flex items-center">
          <div
            className="collapse-title text-md flex items-center gap-4"
            onClick={() => setClicked((prev) => !prev)}
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
            <span>{title}</span>
          </div>
          {/* TODO hover color */}
          {clickEvent ? (
            <span
              className="text-2xl font-light cursor-pointer"
              onClick={clickEvent}
            >
              +
            </span>
          ) : null}
        </p>
        {clicked && children}
      </div>
    </>
  );
};

export default Collapse;
