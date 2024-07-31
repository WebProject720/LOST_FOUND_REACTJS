import React from "react";

const Button = React.forwardRef(function Button(
  {
    onClick = null,
    text = "Enter",
    disable = false,
    addImage = false,
    imageClass = "",
    buttonClass = "",
    ImageUrl = "",
    type = "",
    ...rest
  },
  ref
) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`rounded-md p-1 bg-white 
            focus:outline-none  border-2  autofill:bg-transparent
            placeholder-white placeholder-opacity-50
            focus:border-green-400
            w-full py-2 Max650:focus:border-white
            disabled:bg-slate-400 disabled:cursor-not-allowed 
            invalid:border-red-500 text-xl
             border-white text-blue-600 font-bold box-border ${buttonClass}
             flex flex-row flex-nowrap items-center align-middle justify-center
             disabled:border-0  disabled:text-white
             Max650:text-xl laptop:px-4 disabled:text-opacity-60 Max650:p-1 text-nowrap
             `}
        disabled={disable}
        ref={ref}
        {...rest}
      >
        {addImage && (
          <img
            className={`size-12 inline-flex items-center justify-center ${imageClass}`}
            src={ImageUrl}
            alt=""
          />
        )}
        {text}
      </button>
    </div>
  );
});
export { Button };
