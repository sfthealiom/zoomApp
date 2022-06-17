import React from "react";

const HeInfoText = ({ message, style, className }) => {
  return (
    <div
      className={`text-sm md:text-base text-slate-400 max-w-[320px] md:max-w-xl ${className}`}
      style={style}
    >
      {message}
    </div>
  );
};

export default HeInfoText;
