import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    lableText,
    inputType = "text",
    placeholder = "",
    disable = false,
    isRequired = true,
    ...rest
  },
  ref
) {
  const id = useId();
  return (
    <div>
      <div className="flex flex-row justify-center align-middle items-center">
        <div className="lable">
          <label
            htmlFor={id}
            className={`${!lableText ? "disabled" : ""}
          text-white 
          `}
          >
            {lableText}
          </label>
        </div>
        <input
          className={`rounded-md p-1 bg-transparent shadow-sm
          focus:outline-none focus:border-sky-500 focus:ring-sky-500
           inline border-2  border-gray-400 text-white box-border
          placeholder-white placeholder-opacity-50 w-full py-2
          disabled:bg-slate-400 disabled:cursor-not-allowed 
           in-range:border-green-500 out-of-range:border-red-400
            `}
          id={id}
          type={inputType}
          placeholder={placeholder}
          disabled={disable}
          ref={ref}
          // minLength={inputType == "password" ? 8 : 100}
          required={isRequired}
          {...rest}
        />
      </div>
    </div>
  );
});

export { Input };
