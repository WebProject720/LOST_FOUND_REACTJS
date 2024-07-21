import React from "react";

const Logo = ({style="" }) => {
  return (
    <div className="">
      <div className="w-full">
        <img
          className={`size-20 p-2 rounded-full ${style}`}
          src="/Assets/l--f-high-resolution-logo-white-transparent.png"
          alt="Logo"
        />
      </div>
    </div>
  );
};
export { Logo };
