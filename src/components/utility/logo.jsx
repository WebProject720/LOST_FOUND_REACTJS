import React from "react";

const Logo = ({style="" }) => {
  return (
    <div className="">
      <div className="w-full">
        <img
          className={`size-10 Max650:size-8  rounded-full ${style}`}
          src="https://github.com/WebProject720/LOST_FOUND_REACTJS/blob/main/Assets/l--f-high-resolution-logo-white-transparent.png?raw=true"
          alt="Logo"
        />
      </div>
    </div>
  );
};
export { Logo };
